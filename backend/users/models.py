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
    school = models.ForeignKey('School', on_delete=models.CASCADE)
    major = models.CharField(max_length=20)
    year = models.PositiveSmallIntegerField()
    user_profile = models.ForeignKey(User, on_delete=models.CASCADE, related_name='student_profile')
    reg_key = models.UUIDField(default=uuid.uuid4)

    class Meta:
        db_table = 'students'

    def __str__(self):
        return self.first_name + ' ' + self.last_name

class Category(models.Model):
    category = models.CharField(max_length=50)

    class Meta:
        db_table = 'category'

    def __str__(self):
        return self.category

class Subject (models.Model):
    subject = models.CharField(max_length=50)
    category = models.ForeignKey(Category,on_delete=models.CASCADE)

    class Meta:
        db_table = 'subject'

    def __str__(self):
        return self.subject

class Event(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    time = models.CharField(max_length=50)
    date = models.CharField(max_length=50)
    school = models.ForeignKey(School,on_delete=models.CASCADE)
    guess_total = models.IntegerField(null=True)
    subject = models.ForeignKey(Subject,on_delete=models.CASCADE)
    host = models.ForeignKey(Student,on_delete=models.CASCADE)

    class Meta:
        db_table = 'event'

    def __str__(self):
        return self.event_id+ ' ' + self.event_name

class EventReservation(models.Model):
    guess_count = models.IntegerField(null=True)
    event_id = models.ForeignKey(Event,on_delete=models.CASCADE)
    student_id = models.ForeignKey(Student,on_delete=models.CASCADE)

    class Meta:
        db_table = 'eventreservation'

    def __str__(self):
        return self.student_id + ' ' + event_id

class EventReminder(models.Model):
    student_id = models.ForeignKey(Student,on_delete=models.CASCADE)
    event_id = models.ForeignKey(Event,on_delete=models.CASCADE)
    hours_before_event = models.IntegerField(null=True)

    class Meta:
        db_table = 'eventremeinder'

    def __str__(self):
        return student_id + ' ' + event_id + ' ' + hours_before_event
