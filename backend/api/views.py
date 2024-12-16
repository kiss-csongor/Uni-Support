from rest_framework import status, generics
from rest_framework.response import Response
from .serializers import *

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Sikeres bejelentkezés esetén választ adunk
            return Response({"message": "Bejelentkezés sikeres!"}, status=status.HTTP_200_OK)
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


