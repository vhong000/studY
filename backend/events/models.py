from django.db import models
from accounts.models import Account


class School(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10)

    def __str__(self):
        return f'{self.name.title()} - {self.code}'

    class Meta:
        db_table = 'schools'


class Course(models.Model):
    name = models.CharField(max_length=100)
    number = models.PositiveSmallIntegerField()
    dept = models.CharField(max_length=5)
    school = models.ForeignKey(School, on_delete=models.CASCADE,
                               related_name='courses', null=True)

    def __str___(self):
        return f'{self.name.title()} - {self.dept.upper()} {self.number}'

    class Meta:
        db_table = 'courses'


class Category(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        db_table = 'categories'

    def __str__(self):
        return f'{self.name} ({self.id})'


class Topic(models.Model):
    name = models.CharField(max_length=50)
    image = models.CharField(max_length=100,null=True)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, related_name='topics', null=True)

    class Meta:
        db_table = 'topics'

    def __str__(self):
        return self.name


class Event(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    time = models.DateTimeField()
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    organizer = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True)
    attendees = models.ManyToManyField(Account, related_name='events')
    created = models.DateTimeField(auto_now=False, auto_now_add=True)
    campus = models.ForeignKey(School, on_delete=models.CASCADE,
                               related_name='events', null=True)
    location = models.CharField(max_length=100, default='')
    capacity = models.PositiveSmallIntegerField()

    class Meta:
        db_table = 'events'

    def __str__(self):
        return self.name
