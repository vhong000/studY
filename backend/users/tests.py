from __future__ import unicode_literals
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from users.models import Student
from rest_framework.authtoken.models import Token as REST_Token
import json


class SignupTest(APITestCase):

    def test_invalid_method(self):
        res = self.client.get('/api/auth/signup')
        self.assertEquals(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_singup(self):
        url = reverse('signup')
        data = {
            "username": "jdoe01",
            "first_name": "John",
            "last_name": "Doe",
            "email": "jdoe000@cuny.edu",
            "password": "password123",
            "school": "CCNY",
            "major": "cs",
            "year": "6"
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, 'jdoe01')
        self.assertEqual(Student.objects.get().user_profile, User.objects.get())


class TokenAuthTest(APITestCase):

    user_info = {
        "username": "jdoe01",
        "first_name": "John",
        "last_name": "Doe",
        "email": "jdoe000@cuny.edu",
        "password": "password123",
    }

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(**cls.user_info, is_active=True)
        cls.url = reverse('login')

    def test_invalid_method(self):
        res = self.client.get(self.url)
        self.assertEquals(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_valid_credentials(self):

        res = self.client.post(self.url, {'username': 'jdoe01',
                                          'password': 'password123'}, format='json')
        self.assertEquals(res.status_code, status.HTTP_200_OK)
        self.assertJSONEqual(res.content,
                             {'token': REST_Token.objects.get(user=self.user).key})
