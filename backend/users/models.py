from django.db import models
import uuid
from django.contrib.auth.models import User


class Student(models.Model):
    school = models.CharField(max_length=50)
    major = models.CharField(max_length=20)
    year = models.PositiveSmallIntegerField()
    user_profile = models.ForeignKey(User, on_delete=models.CASCADE, related_name='student_profile')
    reg_key = models.UUIDField(default=uuid.uuid4)

    class Meta:
        db_table = 'students'

    def __str__(self):
        return f'{self.first_name} {self.last_name}'.title()
