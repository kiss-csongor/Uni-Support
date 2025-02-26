from rest_framework import status, generics
from rest_framework.response import Response
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile
from django.contrib.auth.models import User

class ValidateUserView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:  
            return Response({"error": "Bejelentkezés szükséges a folyamathoz."}, status=400)

        user = authenticate(username=username, password=password)

        if user is not None:
            return Response({"success": "Sikeres autentikáció."}, status=200)
        else:
            return Response({"error": "Érvénytelen hitelesítési adatok."}, status=401)
        
class UpdateUserView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def put(self, request):
        username = request.data.get("username")
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
        username = request.data.get("username")
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
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetUserProfileView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            print(request.user)
            profile = UserProfile.objects.get(user__username=request.user)
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({"error": "User profile not found"}, status=404)

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        print("fasza")
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            token = serializer.validated_data['token']
            return Response({
                "message": "Bejelentkezés sikeres!",
                "token": token,
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Felhasználó létrehozása
            serializer.create(validated_data=serializer.validated_data)
            return Response({"message": "Regisztráció sikeres!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


