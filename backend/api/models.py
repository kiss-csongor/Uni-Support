from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False, blank=False)

    def __str__(self):
        return self.user.username
    
class Ticket(models.Model):
    STATUS_CHOICES = [
        ('open', 'Nyitott'),
        ('accepted', 'Elfogadva'),
        ('in_progress', 'Folyamatban'),
        ('closed', 'Lezárva'),
    ]

    PRIORITY_CHOICES = [
        (1, 'Alacsony'),
        (2, 'Közepes'),
        (3, 'Magas'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tickets")
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    priority = models.IntegerField(choices=PRIORITY_CHOICES, default=1)
    resolved_at = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return self.title