from django.db import models
import uuid
from django.contrib.auth.models import User


class School(models.Model):
    name = models.CharField(max_length=100)
    symbol = models.CharField(max_length=10)
    website = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'schools'


class Student(models.Model):
    # school = models.ForeignKey('School', on_delete=models.CASCADE)
    school = models.CharField(max_length=100)
    major = models.CharField(max_length=20)
    year = models.PositiveSmallIntegerField()
    user_profile = models.ForeignKey(User, on_delete=models.CASCADE, related_name='student_profile')
    reg_key = models.UUIDField(default=uuid.uuid4)

    class Meta:
        db_table = 'students'

    def __str__(self):
        return self.first_name + ' ' + self.last_name
