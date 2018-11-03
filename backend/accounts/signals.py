from django.db.models import signals
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from os import getenv
from accounts.models import Account


@receiver(signals.post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


@receiver(signals.post_save, sender=Account)
def send_confirmation_email(sender, instance=None, created=False, **kwargs):
    User = get_user_model()
    if not created:
        return
    if not (settings.CONFIRM_EMAIL):
        User.objects.filter(account=instance).update(is_active=True)
        return

    message = f'Hi {str(instance.owner.first_name)}, \n'
    f'Click on the following link to complete your registration:'
    f'{settings.HOST_NAME}/registration?id={str(instance.reg_key)}'

    send_mail(
        'Confirm email address',
        message,
        settings.EMAIL_HOST_USER,
        [instance.user.email],
        fail_silently=False,
    )
