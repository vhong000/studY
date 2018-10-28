from django.urls import path
from rest_framework import routers
from events import api
from events.api import EventViewSet

router = routers.SimpleRouter(trailing_slash=False)
router.register(r'events', EventViewSet)

urlpatterns = router.urls
