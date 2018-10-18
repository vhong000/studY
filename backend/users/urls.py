from django.urls import path
from . import api

urlpatterns = [
    path('signup', api.SignupView.as_view()),
    path('login', api.CustomAuthToken.as_view()),
    path('user', api.UserView.as_view()),
    path('verify-token', api.verify_token),
    path('registration', api.RegistrationView.as_view()),
]
