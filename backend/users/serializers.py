from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name',
                  'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, payload):
        return User.objects.create_user(**payload, is_active=False)


class StudentSerializer(serializers.ModelSerializer):
    user_profile = UserSerializer()

    class Meta:
        model = Student
        fields = ('school', 'major', 'year', 'user_profile')
        extra_kwargs = {'user_profile': {'write_only': True}}

    def create(self, validated_data):
        user_data = validated_data.pop('user_profile')
        user = User.objects.create_user(**user_data, is_active=True)
        return Student.objects.create(**validated_data, user_profile=user)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model  = Category
        fields = '__all__'
    
    def create(self,validated_data):
        return Category.objects.create(**validated_data)

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Subject
        fields = '__all__'
    
    def create(self,validated_data):
        return Subject.objects.create(**validated_data)

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Event
        fields = '__all__'
    
    def create(self,validated_data):
        return Event.objects.create(**validated_data)
    
    def update(self,instance,validated_data):
        instance.name = validated_data.get('name',instance.name)
        instance.description = validated_data.get('description',instance.description)
        instance.time = validated_data.get('time',instance.time)
        instance.date = validated_data.get('date',instance.date)
        instance.guess_total = validated_data.get('guess_total',instance.guess_total)
        instance.subject = validated_data.get('subject',instance.subject)
        instance.save()
        return instance

class EventReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventReservation
        fields = '__all__'

    def create(self,validated_data):
        return EventReservation.objects.create(**validated_data)
    
    def update(self,instance,validated_data):
        instance.guess_count = validated_data.get('guess_count',instance.guess_count)

class EventReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventReminder
        fields = '__all__'

    def create(self,validated_data):
        return EventReminder.objects.create(**validated_data)
    
    def update(self,instance,validated_data):
        instance.hours_before_event = validated_data.get('hours_before_event',instance.hours_before_event)
