from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.conf import settings
from django.db import models
import uuid


class Account(models.Model):
    school = models.ForeignKey('events.school', on_delete=models.SET_NULL, null=True)
    major = models.CharField(max_length=20)
    owner = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='account')
    reg_key = models.UUIDField(default=uuid.uuid4)

    class Meta:
        db_table = 'accounts'

    def __str__(self):
        return f'{self.owner.first_name} {self.owner.last_name}'.title()


class CustomEmailAuth(ModelBackend):
    def authenticate(self, request, username=None, password=None):
        User = get_user_model()
        try:
            user = User.objects.get(email=username)
        except User.DoesNotExist:
            return None

        if user.check_password(password):
            return user
