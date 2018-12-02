from rest_framework_extensions.routers import ExtendedSimpleRouter
from django.urls import path, include
from events.api import (EventViewSet, SchoolViewSet,
                        CourseViewSet, CategoryView,
                        TopicView, ProfileView,
                        EventGuestsViewSet)


router = ExtendedSimpleRouter(trailing_slash=False)

router.register(r'events', EventViewSet)\
      .register(r'attendees', EventGuestsViewSet,
                base_name='event-attendees',
                parents_query_lookups=['events'])

router.register(r'schools', SchoolViewSet, base_name='school')\
      .register(r'courses', CourseViewSet,
                base_name='school-courses',
                parents_query_lookups=['school'])

router.register(r'categories', CategoryView)
router.register(r'courses', CourseViewSet, base_name='course')
router.register(r'topics', TopicView)

urlpatterns = [
    path('', include(router.urls)),
    path('profile', ProfileView.as_view(), name='profile')
]
