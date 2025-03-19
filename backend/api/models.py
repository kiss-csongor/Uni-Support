from os import name
from tokenize import Comment
from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False, blank=False)
    full_name = models.CharField(max_length=60, null=True, blank=True)
    mothers_name = models.CharField(max_length=60, null=True, blank=True)
    phone_number = models.CharField(max_length=20 , null=True, blank=True)
    neptun_code = models.CharField(max_length=6 ,null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    birth_place = models.CharField(max_length=30, null=True, blank=True)
    authenticated = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username
    
class Ticket(models.Model):
    STATUS_CHOICES = [
        ('open', 'Nyitott'),
        ('accepted', 'Elfogadott'),
        ('in_progress', 'Folyamatban lévő'),
        ('closed', 'Lezárt'),
    ]

    PRIORITY_CHOICES = [
        (1, 'Alacsony'),
        (2, 'Közepes'),
        (3, 'Magas'),
    ]

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tickets")
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    priority = models.IntegerField(choices=PRIORITY_CHOICES, default=1)
    resolved_at = models.DateTimeField(null=True, blank=True)
    archived = models.BooleanField(default=False) 
    
    def __str__(self):
        return f'{self.author} {self.id}. számú {self.status} ticketje'

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name="messages") 
    text = models.CharField(max_length=500, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.sender} üzenete a {self.ticket.id}. számú tickethez'
    
class NeptunData(models.Model):
    neptun_code = models.CharField(max_length=6 ,null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    full_name = models.CharField(max_length=255)
    mothers_name = models.CharField(max_length=255)
    birth_place = models.CharField(max_length=30, null=True, blank=True)

    def __str__(self):
        return f'{self.full_name} - {self.neptun_code}'
    
class Tag(models.Model):
    ticket = models.ManyToManyField(Ticket, on_delete=models.CASCADE, related_name="tags")
    name = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.ticket.id}. számú tickethez tartozó {self.name} tag'