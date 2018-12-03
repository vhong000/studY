from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.contrib.auth.models import User
from .models import Account


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

    def update(self, user, payload):
        pass


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
        user = User.objects.create_user(**user_data, is_active=False)
        return Account.objects.create(**validated_data, id=user.id, owner=user)

    def update(self, profile, validated_data):
        self._update_instance(profile.owner, validated_data.pop('owner'))
        return self._update_instance(profile, validated_data)

    def _update_instance(self, obj, data):
        for attr, val in data.items():
            setattr(obj, attr, val)
        obj.save()
        return obj
