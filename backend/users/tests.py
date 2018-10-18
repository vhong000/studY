from __future__ import unicode_literals
from django.test import TestCase


class BasicTestCase(TestCase):

    # @classmethod
    # def setUp(self):

    def test_basic(self):
        res = self.client.get('/')
        self.assertEquals(res.status_code, 200)

    def test_api_access(self):
        res = self.client.get('/api/auth/user')
        self.assertEquals(res.status_code, 401)
