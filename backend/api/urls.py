from django.urls import path
from .views import *

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('get-user/', GetUserProfileView.as_view(), name='user-detail'),
    path('update-user/', UpdateUserView.as_view(), name='update-user'),
    path('update-user-profile/', UpdateUserProfileView.as_view(), name='update-user-profile'),
    path('validate-user/', ValidateUserView.as_view(), name='validate-user'),
]