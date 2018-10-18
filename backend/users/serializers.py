from rest_framework import serializers
from .models import Student, Token
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name',
                  'username', 'email', 'is_active')

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
        user = User.objects.create_user(**user_data, is_active=False)
        return Student.objects.create(**validated_data, user_profile=user)


class TokenSerializer(serializers.ModelSerializer):
    student = StudentSerializer()

    class Meta:
        model = Token
        fields = ('token', 'student', 'status', 'type')
