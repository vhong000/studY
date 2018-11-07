from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.urls import reverse
import json

from .factories import AccountFactory, UserFactory, SchoolFactory, EventFactory
from events.serializers import EventSerializer
from accounts.serializers import AccountSerializer
from events.models import Event
# from rest_framework.renderers import JSONRenderer


class EventTests(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.make_objects()
        cls.account = AccountFactory.create()

    def setUp(self):
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' +
                                self.account.owner.auth_token.key)

    @classmethod
    def make_objects(cls):
        SchoolFactory.create()
        AccountFactory.create_batch(size=15)

    @classmethod
    def make_events(cls):
        event_list = []
        for i in range(5):
            event = EventFactory.create()
            event_list.append(EventSerializer(event).data)
        return event_list

    def test_event_list(self):
        created_events = self.make_events()
        res = self.client.get(reverse('event-list'))
        self.assertEqual(created_events, res.data['results'])

    def test_event_detail(self):
        created_events = self.make_events()
        for event in created_events:
            url = reverse('event-detail', kwargs={'pk': event['id']})
            res = self.client.get(url)
            self.assertEqual(event, res.data)

    def test_create_event(self):
        event_obj = EventSerializer(EventFactory.build()).data
        res = self.client.post(reverse('event-list'), data=event_obj)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        created_event = EventSerializer(Event.objects.get(id=res.data['id'])).data
        self.assertEqual(res.data, created_event)

    def test_delete_event(self):
        test_event = EventSerializer(EventFactory.create(organizer=self.account)).data
        res = self.client.delete(
            reverse('event-detail', kwargs={'pk': test_event['id']}))
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Event.objects.filter(id=test_event['id']).exists())

    def test_delete_event_unauthorized(self):
        owner = AccountFactory.create()
        test_event = EventSerializer(EventFactory.create(organizer=owner)).data
        res = self.client.delete(
            reverse('event-detail', kwargs={'pk': test_event['id']}))
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)
        self.assertTrue(Event.objects.filter(id=test_event['id']).exists())


class EventGuestsTest(APITestCase):
    pass
