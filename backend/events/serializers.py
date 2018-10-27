from rest_framework import serializers
from .models import Course, School, Topic, Event

class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = '__all__'

    def create(self, validated_data):
        return Course(**validated_data)

class SchoolSerializer(serializers.ModelSerializer):

    class Meta:
        model = School
        fields = '__all__'

    def create(self, validated_data):
        return School(**validated_data)

class TopicSerializer(serializers.ModelSerializer):

    class Meta:
        model = Topic
        fields = '__all__'

    def create(self, validated_data):
        return Topic(**validated_data)

class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = '__all__'

    def create(self, validated_data):
        return Event(**validated_data)
