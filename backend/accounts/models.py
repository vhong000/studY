from django.db import models
import uuid
from django.contrib.auth.models import User


class Account(models.Model):
    school = models.ForeignKey('events.school', on_delete=models.SET_NULL, null=True)
    major = models.CharField(max_length=20)
    # year = models.PositiveSmallIntegerField(null=True)
    owner = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='account')
    reg_key = models.UUIDField(default=uuid.uuid4)

    class Meta:
        db_table = 'accounts'

    def __str__(self):
        return f'{self.owner.first_name} {self.owner.last_name}'.title()
