from django.db import models
import uuid
from django.contrib.auth.models import User


class School(models.Model):
    schoolID = models.AutoField(primary_key=True)
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

class Category(models.Model):
    category_id = models.AutoField(primary_key=true)
    category = models.CharField(max_length=50)

    class Meta:
        db_table = 'category'

    def __str__(self):
        return self.category

class Subject (models.Model):
    subject_id= models.AutoField(primary_key=true)
    subject = models.CharField(max_length=50)
    category = models.ForeignKey(Category,on_delete=models.CASCADE)

    class Meta:
        db_table = 'subject'

    def __str__(self):
        return self.subject

class Event(models.Model):
    evntID = models.AutoField(primary_key=True)
    event_name = models.CharField(max_length=100)
    event_description = models.CharField(max_length=1000)
    event_time = models.CharField(max_length=50)
    event_date = models.CharField(max_length=50)
    school_id = models.ForeignKey(School,on_delete=models.CASCADE)
    guess_total = models.IntegerField(null=True)
    subject = models.ForeignKey(Subject,on_delete=models.CASCADE)
    host = models.ForeignKey(Student,on_delete=models.CASCADE)

    class Meta:
        db_table = 'event'

    def __str__(self):
        return self.event_id+ ' ' + self.event_name

class EventReservation(models.Model):
    reservation_id = models.AutoField(primary_key=True)
    guess_count = models.IntegerField(null=True)
    event_id = models.ForeignKey(Event,on_delete=models.CASCADE)
    student_id = models.ForeignKey(Student,on_delete=models.CASCADE)

    class Meta:
        db_table = 'eventreservation'

    def __str__(self):
        return self.student_id + ' ' + event_id

class EventReminder(models.Model):
    event_reminder_id = models.AutoField(primary_key=True)
    student_id = models.ForeignKey(Student,on_delete=models.CASCADE)
    event_id = models.ForeignKey(Event,on_delete=models.CASCADE)
    hours_before_event = models.IntegerField(null=True)

    class Meta:
        db_table = 'eventremeinder'

    def __str__(self):
        return student_id + ' ' + event_id + ' ' + hours_before_event
