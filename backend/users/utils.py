from django.core.mail import send_mail
from .models import Student, Token
from django.db.models import signals
from os import getenv
from django.conf import settings
from root.settings import HOST_NAME
from django.dispatch import receiver
from rest_framework.authtoken.models import Token as auth_token
from .serializers import TokenSerializer

DEFAULT = 'mabdou000@citymail.cuny.edu'


@receiver(signals.post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        auth_token.objects.create(user=instance)


def generate_tokens(data, proc_type):
    tokens = []
    for entry in data:
        token = Token.objects.create(
            student=Student.objects.get(email=entry['email']),
            type=proc_type, status='created')
        tokens.append(TokenSerializer(token).data)
    return tokens


def token_signal(sender, instance, signal, *args, **kwargs):

    message = f'Hi {str(instance.student.first_name)}, \n'
    f'Click on the following link to complete your registration:'
    f'{HOST_NAME}/registration?token={str(instance.token)}'

    if instance.type == 'reg':
        title = 'Registration Access Token'

    email = instance.student.email

    if instance.status == 'created':
        instance.status = 'sent'
        instance.save()
        send_mail(
            title,
            message,
            getenv('GTEST_EMAIL', default=None),
            [email or DEFAULT],
            fail_silently=False,
        )


signals.post_save.connect(token_signal, sender=Token)
