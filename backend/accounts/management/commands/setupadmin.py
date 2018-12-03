from django.core.management.base import BaseCommand
import os
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        User = get_user_model()
        if not User.objects.filter(is_superuser=True).exists():
            try:
                print('creating superuser')
                User.objects.create_superuser(
                    email=os.environ['ADMIN_EMAIL'], password=os.environ['ADMIN_PASSWORD'], username=os.environ['ADMIN_USERNAME'])
            except Exception as e:
                print(str(e))
