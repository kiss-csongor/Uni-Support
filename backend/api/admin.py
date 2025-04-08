from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(UserProfile)
admin.site.register(Ticket)
admin.site.register(Message)
admin.site.register(NeptunData)
admin.site.register(Tag)