from django.db import models
from users.models import Student


class School(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10)
    # students = models.ManyToManyField(Student, related_name='school')

    def __str__(self):
        return f'{self.name.title()} - {self.code}'

    class Meta:
        db_table = 'schools'


class Course(models.Model):
    name = models.CharField(max_length=100)
    number = models.PositiveSmallIntegerField()
    dept = models.CharField(max_length=5)
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='courses', null=True)

    def __str___(self):
        return f'{self.name.title()} - {self.dept.upper()} {self.number}'

    class Meta:
        db_table = 'courses'


class Topic(models.Model):
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=50)

    class Meta:
        db_table = 'topics'

    def __str__(self):
        return self.name


class Event(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    time = models.DateTimeField()
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    organizer = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True)
    guests = models.ManyToManyField(Student, related_name='events')

    class Meta:
        db_table = 'events'

    def __str__(self):
        return self.title
