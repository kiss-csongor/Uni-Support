from django.urls import path
from .views import *

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('get-user/', GetUserProfileView.as_view(), name='user-detail'),
    path('update-user/', UpdateUserProfileView.as_view(), name='user-detail'),
]