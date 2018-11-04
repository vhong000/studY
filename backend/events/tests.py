from django.test import TestCase
from django.urls import reverse
from events.models import *
import datetime

# Create your tests here.

class SchoolTest(TestCase):
    def create_school(self,name="City College",code="CCNY"):
        return School.objects.create(name=name,code=code)

    def test_create_school(self):
        school = self.create_school()
        self.assertTrue(isinstance(school,School))
        self.assertEqual(school.__str__(),"City College - CCNY")

class CourseTest(TestCase):
    def create_course(self,name="Paradimgs"
                      ,number="33500",dept="CSC"):
        return Course.objects.create(name=name,number=number,
                                    dept=dept)

    def test_create_course(self):
        course = self.create_course()
        self.assertTrue(isinstance(course,Course))
        # self.assertEqual(course.__str__(),"Paradimgs - CSC 33500")

class CategoryTest(TestCase):

    def create_category(self,name="History"):
        return Category.objects.create(name=name)

    def test_create_category(self):
        category = self.create_category()
        self.assertTrue(isinstance(category,Category))

class TopicTest(TestCase):

    def create_topic(self,name="US"):
        return Topic.objects.create(name=name)

    def tets_create_topic(self):
        topic = self.create_topic()
        self.assertTrue(isinstance(topic,Topic))
        self.assertEqual(topic.__str__(),"US")

# class EventTest(TestCase):
    # time = datetime.datetime()
    # topic = Topic.objects.create(name="US")
    #
    # def create_event(self,name="Image Processing",
    #                 description="midterm study",
    #                 topic=topic,capacity=12):
    #     return Event.objects.create(name=name,description=description,
    #                                 topic=topic,
    #                                 capacity=capacity)
    #
    # def test_create_event(self):
    #     event = create_event()
    #     self.assertTrue(isinstance(event,Event))
    #     self.assertEqual(event.__str__(),"Image Processing")



