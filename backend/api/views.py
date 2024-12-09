from rest_framework import status, generics
from rest_framework.response import Response
from .serializers import LoginSerializer

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Sikeres bejelentkezés esetén választ adunk
            return Response({"message": "Bejelentkezés sikeres!"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


