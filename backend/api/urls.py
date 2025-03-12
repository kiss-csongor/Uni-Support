from django.urls import path
from .views import *

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
    path('get-user/', GetUserProfileView.as_view(), name='user-detail'),
    path('update-user/', UpdateUserView.as_view(), name='update-user'),
    path('update-user-profile/', UpdateUserProfileView.as_view(), name='update-user-profile'),
    path('validate-user/', ValidateUserView.as_view(), name='validate-user'),
    path('token-refresh/', RefreshTokenView.as_view(), name='token-refresh'),
    path('validate-neptun-code/', ValidateNeptunCode.as_view(), name='validate-neptun-code'),
    path('create-tickets/', CreateTickets.as_view(), name='create-tickets'),
    path('get-self-tickets/', GetSelfTickets.as_view(), name='get-self-tickets'),
    path('get-all-tickets/', GetAllTickets.as_view(), name='get-all-tickets'),
    path('get-is-superuser/', GetIsSuperUserView.as_view(), name='get-is-superuser'),
    path('update-ticket/', UpdateTicketView.as_view(), name='update-ticket'),
    path('new-message/', NewMessageView.as_view(), name='new-message'),
]