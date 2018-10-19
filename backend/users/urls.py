from django.urls import path
from . import api

urlpatterns = [
    path('signup', api.SignupView.as_view(), name='signup'),
    path('login', api.CustomAuthToken.as_view(), name='login'),
    path('get-user', api.UserView.as_view(), name='get-user'),
    path('confirm-email', api.RegistrationView.as_view(), name='confirm-email'),
    # path('test-signal', api.TestSignal.as_view()),
]
