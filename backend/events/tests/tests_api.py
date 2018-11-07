from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from .factories import AccountFactory, UserFactory, SchoolFactory
# from event.serializers import
from accounts.serializers import AccountSerializer


class EventTests(APITestCase):
    # fixtures = ['events/fixtures/snapshot.json']
    # @classmethod
    def setUp(self):
        school_factory = SchoolFactory()
        self.schools = school_factory.create()
        self.account = AccountFactory()
        # print(AccountSerializer(account).data)

        self.client.credentials(HTTP_AUTHORIZATION='Token ' +
                                self.account.owner.auth_token.key)

    def test_authentication(self):
        res = self.client.get(reverse('profile'))
        self.assertEqual(res.status_code, 200)
