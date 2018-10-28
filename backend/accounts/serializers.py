from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.contrib.auth.models import User
from .models import Account
from events.models import School


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name',
                  'username', 'email', 'password')
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {'write_only': True}
        }

    def create(self, payload):
        return User.objects.create_user(**payload, is_active=False)


class AccountSerializer(serializers.ModelSerializer):
    owner = UserSerializer()

    class Meta:
        model = Account
        fields = ('school', 'major', 'owner')
        extra_kwargs = {'owner': {'write_only': True}}

    def create(self, validated_data):
        user_data = validated_data.pop('owner')
        if User.objects.filter(email=user_data['email']).exists():
            raise ValidationError('email already exists')
        user = User.objects.create_user(**user_data, is_active=True)
        return Account.objects.create(**validated_data, owner=user)
