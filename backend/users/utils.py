from django.core.mail import send_mail
from .models import Student
from django.db.models import signals
from os import getenv
from django.conf import settings
import root.settings as ENV
from django.dispatch import receiver
from rest_framework.authtoken.models import Token as auth_token
from django.contrib.auth.models import User
from django.contrib.auth.backends import ModelBackend


class CustomEmailAuth(ModelBackend):
    def authenticate(self, request, username=None, password=None):
        try:
            user = User.objects.get(email=username)
        # pwd_valid = check_password(password, user)
        except User.DoesNotExist:
            return None

        if user.check_password(password):
            return user


@receiver(signals.post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        auth_token.objects.create(user=instance)


@receiver(signals.post_save, sender=Student)
def send_confirmation_email(sender, instance=None, created=False, **kwargs):
    if not created:
        return
    if not (ENV.CONFIRM_EMAIL):
        User.objects.filter(student_profile=instance).update(is_active=True)
        return

    message = f'Hi {str(instance.usUserer.first_name)}, \n'
    f'Click on the following link to complete your registration:'
    f'{ENV.HOST_NAME}/registration?id={str(instance.reg_key)}'

    if instance.status == 'created':
        instance.status = 'sent'
        instance.save()
        send_mail(
            'Confirm email address',
            message,
            getenv('GMAIL_ADDRESS', default=None),
            [instance.user.email],
            fail_silently=False,
        )
