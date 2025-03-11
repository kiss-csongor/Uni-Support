from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from django.middleware import csrf
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import *
from .serializers import *

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

def invalid_token_delete(request):
    response = Response({"message": "Munkamenete lejárt, kérjük, jelentkezzen be újra!"}, status=status.HTTP_401_UNAUTHORIZED)
    response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
    response.delete_cookie("refresh_token")
    response.delete_cookie("csrftoken")
    request.session.flush()
    return response

def validate_neptun_code(profile):
    try:
        neptun_record = NeptunData.objects.filter(neptun_code=profile.neptun_code).first()

        if not neptun_record:
            return Response({"error": "Neptun kódja nem érvényes. Ellenőrizze és javítsa!"}, status=400)

        if (
            neptun_record.birth_date == profile.birth_date and
            neptun_record.birth_place == profile.birth_place and
            neptun_record.full_name == profile.full_name and
            neptun_record.mothers_name == profile.mothers_name
        ):
            user_profile = UserProfile.objects.filter(user=profile.user).first()
            if user_profile:
                user_profile.authenticated = True
                user_profile.save()
            return Response({"success": "Sikeres hitelesítés. Most már létrehozhat hibajegy(ek)et, ha gondja merül fel."}, status=200)
        else:
            return Response({"error": "Adatai nem megfelelőek. Kérem ellenőrizze és javítsa azokat!"}, status=400)

    except Exception as e:
        return Response({"error": f"Hiba történt: {str(e)}"}, status=500)


class RefreshTokenView(generics.GenericAPIView):
    authentication_classes = [] 
    permission_classes = []

    def post(self, request):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            if not refresh_token:
                return Response({"error": "No refresh token provided"}, status=400)

            refresh = RefreshToken(refresh_token) 
            new_access_token = str(refresh.access_token)

            response = Response({"message": "Access token refreshed"}, status=200)

            response.set_cookie(
                key="access_token",
                value=new_access_token,
                httponly=True,
                secure=False,
                samesite="Lax",
            )

            return response

        except (TokenError, InvalidToken):
            return invalid_token_delete(request)

class LoginView(generics.GenericAPIView):
    def post(self, request, format=None):
        data = request.data
        response = Response()
        username = data.get('username', None)
        password = data.get('password', None)
        user = authenticate(username=username, password=password)

        if user is not None:
            if user.is_active:
                # Generálj egy refresh token-t és access token-t
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)

                # Set the access token as HttpOnly cookie
                response.set_cookie(
                    key=settings.SIMPLE_JWT['AUTH_COOKIE'],
                    value=access_token,
                    expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                    secure=False,
                    httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                    samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
                )

                # Set the refresh token as HttpOnly cookie
                response.set_cookie(
                    key="refresh_token",
                    value=refresh_token,
                    expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                    secure=False,
                    httponly=False,
                    samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
                )

                csrf.get_token(request)
                
                response.data = {"Success": "Login successful", "data": {"refresh_token": refresh_token}}
                return response
            else:
                return Response({"No active": "This account is not active!!"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"Invalid": "Invalid username or password!!"}, status=status.HTTP_404_NOT_FOUND)
        
class LogoutView(generics.GenericAPIView):
    authentication_classes = [] 
    permission_classes = []

    def post(self, request):
        response = Response({"message": "Kijelentkezés sikeres"}, status=status.HTTP_200_OK)
        response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
        response.delete_cookie("refresh_token")
        response.delete_cookie("csrftoken")
        request.session.flush()
        return response


class GetUserProfileView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = UserProfile.objects.get(user__username=request.user)
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({"error": "User profile not found"}, status=404)
    
class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Felhasználó létrehozása
            serializer.create(validated_data=serializer.validated_data)
            return Response({"message": "Regisztráció sikeres!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       

class UpdateUserView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def put(self, request):
        username = request.user
        if not username:
            return Response({"error": "Username is required"}, status=400)

        try:
            user = User.objects.get(username=username)
        except UserProfile.DoesNotExist:
            return Response({"error": "User profile not found"}, status=404)

        serializer = self.get_serializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateUserProfileView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer

    def put(self, request):
        username = request.user
        if not username:
            return Response({"error": "Username is required"}, status=400)

        try:
            profile = UserProfile.objects.get(user__username=username)
        except UserProfile.DoesNotExist:
            return Response({"error": "User profile not found"}, status=404)
        
        birth_date = request.data.get('birth_date')
        if birth_date == '':
            request.data['birth_date'] = None

        serializer = self.get_serializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            user_profile = UserProfile.objects.filter(user=profile.user).first()
            user_profile.authenticated = False
            user_profile.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ValidateUserView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer

    def post(self, request):
        password = request.data.get("password")
        username = request.user

        if not username or not password:  
            return Response({"error": "Bejelentkezés szükséges a folyamathoz."}, status=400)

        user = authenticate(username=username, password=password)

        if user is not None:
            return Response({"success": "Sikeres hitelesítés."}, status=200)
        else:
            return Response({"error": "Érvénytelen hitelesítési adatok."}, status=401)
        
class ValidateNeptunCode(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        username = request.user

        if not username:
            return Response({"error": "Nincs aktív felhasználói munkafolyamat. Kérem jelentkezzen be!"}, status=401)

        try:
            profile = UserProfile.objects.get(user__username=username)

            if profile.authenticated:
                return Response({"success": "Sikeres hitelesítés. Most már létrehozhat hibajegy(ek)et, ha gondja merül fel."}, status=200)
            else:
                return validate_neptun_code(profile)
        except UserProfile.DoesNotExist:
            return Response({"error": "Felhasználói profil nem található."}, status=401)
        
class CreateTickets(generics.GenericAPIView):
    serializer_class = createTicketSerializer

    def post(self, request):
        user = request.user
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.create(validated_data=serializer.validated_data, user=user)
            return Response({"success": "Sikeresen létrehozta a hibajegyet."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GetSelfTickets(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            tickets = Ticket.objects.filter(author=request.user)
            serializer = TicketSerializer(tickets, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
        
class GetAllTickets(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            tickets = Ticket.objects
            serializer = TicketSerializer(tickets, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

class GetIsSuperUserView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"is_superuser": request.user.is_superuser})
    
class UpdateTicketView(generics.GenericAPIView):
    def put(self, request):
        ticket_data = request.data
        try:
            ticket = Ticket.objects.get(id=ticket_data['id'])
        except Ticket.DoesNotExist:
            return Response({"error": "Ticket not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = TicketSerializer(ticket, data=ticket_data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)