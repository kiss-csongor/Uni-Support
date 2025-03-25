from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import *
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "first_name", "last_name"]

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'
        depth = 1 

    def validate_birth_date(self, value):
        if value == '':
            return None
        return value
    
class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
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
        user_profile = UserProfile.objects.create(
            user=user
        )
        return user
    
class createTicketSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    description = serializers.CharField(max_length=255)

    def validate(self, data):
        return data

    def create(self, validated_data, user):
        ticket = Ticket.objects.create(
            title=validated_data['title'],
            description=validated_data['description'],
            author=user
        )
        return ticket
    
class TicketSerializer(serializers.ModelSerializer):
    message_count = serializers.SerializerMethodField()
    tags = serializers.SerializerMethodField()  # Egyedi getter metódus olvasásra
    tags_input = serializers.ListField(write_only=True, required=False)  # Írásnál stringeket fogad el

    class Meta:
        model = Ticket
        fields = '__all__'

    def get_message_count(self, obj):
        return Message.objects.filter(ticket=obj, read=False).count()

    def get_tags(self, obj):
        return [tag.name for tag in obj.tags.all()]  # Neveket ad vissza

    def update(self, instance, validated_data):
        # Ha vannak tags_input adatok, frissítjük a tageket
        if "tags_input" in validated_data:
            tag_names = validated_data.pop("tags_input")
            tags = [Tag.objects.get_or_create(name=name)[0] for name in tag_names]
            instance.tags.set(tags)
        
        return super().update(instance, validated_data)
    
class MessageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Message
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Tag
        fields = '__all__'