from __future__ import unicode_literals
from django.test import TestCase


class BasicTestCase(TestCase):

    # @classmethod
    # def setUp(self):

    def test_basic(self):
        res = self.client.get('/')
        self.assertEquals(res.status_code, 200)
