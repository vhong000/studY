from django.contrib import admin
from events import models
from accounts.models import Account


@admin.register(models.Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = [field.attname for field in models.Course._meta.fields]\
        + ['school_code']

    def school_code(self, course):
        if course.school:
            return course.school.code


@admin.register(models.School)
class SchoolAdmin(admin.ModelAdmin):
    list_display = [field.attname for
                    field in models.School._meta.fields]


@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = [field.attname for
                    field in models.Category._meta.fields]


@admin.register(models.Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'category_name']

    def category_name(self, topic):
        return topic.category.name


@admin.register(models.Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'time', 'capacity', 'guest_count', 'created_at',
                    'campus_code', 'topic_name',  'organizer_name')

    def guest_count(self, event):
        return event.attendees.count()

    def campus_code(self, event):
        if event.campus:
            return event.campus.code

    def organizer_name(self, event):
        return event.organizer

    def topic_name(self, event):
        return event.topic


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ['email', 'name', 'id', 'school_code', 'reg_key']

    def school_code(self, inst):
        if inst.school:
            return inst.school.code

    def email(self, inst):
        return inst.owner.email

    def name(self, inst):
        return str(inst)
