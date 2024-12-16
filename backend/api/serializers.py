from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        user = authenticate(username=username, password=password)

        if user is None:
            raise serializers.ValidationError("Nem tartozik a hitelesítési adatokhoz felhasználó")
        
        return data
    
class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        # Ellenőrizzük, hogy létezik-e már a felhasználó
        username = data.get('username')
        email = data.get('email')

        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError("Ez a felhasználónév már foglalt.")
        
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Ez az email cím már regisztrálva van.")
        
        return data

    def create(self, validated_data):
        # Új felhasználó létrehozása
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user