from __future__ import unicode_literals
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from users.models import *
from rest_framework.authtoken.models import Token as REST_Token
import json
from django.test import TestCase


class SignupTest(APITestCase):

    def test_invalid_method(self):
        res = self.client.get(reverse('signup'))
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

        res = self.client.post(self.url, {'email':  self.user_info['email'],
                                          'password': self.user_info['password']}, format='json')
        self.assertEquals(res.status_code, status.HTTP_200_OK)
        self.assertJSONEqual(res.content,
                             {'token': REST_Token.objects.get(user=self.user).key})

# simple test for insert into the db
class CategoryTest(TestCase):
    def test_insert(self):
        Category.objects.create(category='Math')
        
    def test_verify(self):
        math = Category.objects.get(category='Math')
        self.assertEqual(math.category(),'Math')

class SubjectTest(TestCase):
    def test_insert(self):
        Subject.objects.create(subject='Calculus',category='Math')
    
    def test_verify(self):
        math = Subject.objects.get(category='Math')
        subject = Subject.objects.get(subject='Calculus')
        self.assertEqual(math.category(),'Math')
        self.assertEqual(subject.subject(),'Calculus')

class EventTest(TestCase):
    def test_insert(self):
        arg = {
            "name":"Series",
            "description":"Deriving the geometric seires",
            "time":"2:00pm",
            "date":"10/26/18",
            "school":1,
            "guess_total":20,
            "subject":"Calculus",
            "host":"jdoe01"
        }
        Event.objects.create(arg)
    
    def test_verify(self):
        name = Event.objects.get(name='Series')
        self.assertEqual(name.name(),'Series')

class EventReservationTest(TestCase):
    def test_insert(self):
        arg = {
            "student_id":1,
            "event_id":1,
            "guess_count":19
        }
        EventReservation.objects.create(arg)
    
    def test_verify(self):
        count = EventReservation.objects.get(event_id=1)
        self.assertEqual(count.guess_count(),19)

class EventReminderTest(TestCase):
    def test_insert(self):
        arg = {
            "student_id":1,
            "event_id":1,
            "hours_before_event":"1:00"
        }
        EventReminder.objects.create(arg)
    
    def test_verify(self):
        hour = EventReservation.objects.get(event_id=1)
        self.assertEqual(hour.hours_before_event(),1)


