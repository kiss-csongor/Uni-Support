from rest_framework import status, generics
from rest_framework.response import Response
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile

class UserDetailView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        username = request.data.get("username")
        if not username:
            return Response({"error": "Username is required"}, status=400)

        try:
            profile = UserProfile.objects.get(user__username=username)
            serializer = UserSerializer(profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({"error": "User profile not found"}, status=404)

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            token = serializer.validated_data['token']
            user = serializer.validated_data['user']
            return Response({
                "message": "Bejelentkezés sikeres!",
                "token": token,
                "user": user.username,
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


