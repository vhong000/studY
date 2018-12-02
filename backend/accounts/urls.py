from django.urls import path
from . import api

urlpatterns = [
    path('signup', api.SignupView.as_view(), name='signup'),
    path('login', api.AuthenticationView.as_view(), name='login'),
    path('confirm-email', api.EmailConfirmationView.as_view(), name='confirm-email')
    # path('test-signal', api.TestSignal.as_view()),
]
