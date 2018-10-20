from rest_framework import serializers
from .models import Student
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
