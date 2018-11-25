from __future__ import unicode_literals
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from accounts.models import Account
from events.tests.factories import AccountFactory, UserFactory
from .serializers import UserSerializer


class SignupTest(APITestCase):

    USER_INFO = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "jdoe000@baruch.cuny.edu",
        "password": "p@$$w0rd",
    }

    def test_illegal_method(self):
        res = self.client.get(reverse('signup'))
        self.assertEquals(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_singup(self):
        account = AccountFactory.build(
            owner=UserFactory.build(**self.USER_INFO), school=None)
        account_info = UserSerializer(account.owner).data

        response = self.client.post(reverse('signup'), self.USER_INFO)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)

        created_account = UserSerializer(Account.objects.get().owner).data
        for att in ['first_name', 'last_name', 'email']:
            self.assertEqual(created_account[att], account_info[att])


class TokenAuthTest(APITestCase):
    URL = reverse('login')

    @classmethod
    def setUpTestData(cls):
        cls.user = UserFactory.create(password='p@$$w0rd')
        setattr(cls.user, 'raw_password', 'p@$$w0rd')

    def test_invalid_method(self):
        res = self.client.get(self.URL)
        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_login(self):
        res = self.client.post(self.URL, {'email':  self.user.email,
                                          'password': self.user.raw_password})
        self.assertEquals(res.status_code, status.HTTP_200_OK)
        self.assertJSONEqual(res.content, {'token': self.user.auth_token.key})

    def test_invalid_credentials(self):
        res = self.client.post(self.URL, {'email':  self.user.email,
                                          'password': self.user.raw_password[::-1]})
        self.assertEquals(res.status_code, status.HTTP_400_BAD_REQUEST)
