from django.test import TestCase
from django.urls import reverse
from events.models import *

# Create your tests here.

class SchoolTest(TestCase):
    def create_school(self,name="City College",code="CCNY"):
        return School.objects.create(name=name,code=code)

    def test_create_school(self):
        school = self.create_school()
        self.assertTrue(isinstance(school,School))
        self.assertEqual(school.__str__(),"City College - CCNY")

class
