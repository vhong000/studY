from rest_framework import serializers
from .models import Event, School, Topic, Course
from accounts.serializers import AccountSerializer
from accounts.models import Account


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ('id', 'name', 'code')


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ('id', 'category', 'name')


class EventSerializer(serializers.ModelSerializer):
    # campus = SchoolSerializer()
    organizer = AccountSerializer(read_only=True)

    class Meta:
        model = Event
        fields = ('id', 'name', 'description', 'time', 'topic',
                  'capacity', 'campus', 'organizer')


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('__all__')
