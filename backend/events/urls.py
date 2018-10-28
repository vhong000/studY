from rest_framework_extensions.routers import ExtendedSimpleRouter
from django.urls import path, include
from events import api
from events.api import EventViewSet, SchoolViewSet, CourseViewSet

router = ExtendedSimpleRouter(trailing_slash=False)

router.register(r'events', EventViewSet)

(
    router.register(r'schools', SchoolViewSet, base_name='school')
          .register(r'courses',
                    CourseViewSet,
                    base_name='schools-course',
                    parents_query_lookups=['school_courses'])
)

urlpatterns = [
    path('', include(router.urls)),
]
