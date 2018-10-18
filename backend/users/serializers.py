from rest_framework import serializers
from .models import Student, Token
from django.contrib.auth.models import User


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = ('first_name', 'last_name', 'email')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name',
                  'username', 'email', 'is_active')


class TokenSerializer(serializers.ModelSerializer):
    student = StudentSerializer()

    class Meta:
        model = Token
        fields = ('token', 'club', 'student', 'status', 'type')
