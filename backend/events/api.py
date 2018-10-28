# from rest_framework.authentication import (BasicAuthentication,
#                                            SessionAuthentication,
#                                            TokenAuthentication)
from rest_framework import permissions
from rest_framework import generics
from rest_framework import viewsets
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from django.db.models import Q
from django.conf import settings
import json

from events.serializers import SchoolSerializer, TopicSerializer, EventSerializer, CourseSerializer
from events.models import Event, Course, Topic, School
from accounts.models import Account
from accounts.serializers import AccountSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    filterset_fields = ('campus', 'topic', 'topic__category')
    # search_fields = ('description', 'topic', 'campus', 'name')
    # ordering_fields = '__all__'
    # ordering = ('created',)

    def perform_create(self, serializer):
        serializer.save(organizer=self.request.user.account)

    @action(methods=['get'], detail=True, url_path='attendees', url_name='event-guests')
    def get_attendees(self, request, pk=None):
        event = self.get_object()
        guests = AccountSerializer(event.attendees, many=True).data
        return Response(data=guests)

    @action(methods=['post'], detail=True, url_path='join', url_name='join-event')
    def join_event(self, request, pk=None):
        event = self.get_object()
        if event.attendees.count() < event.capacity:
            event.attendees.add(self.request.user.account)
            return Response(data="success", status=status.HTTP_200_OK, content_type="application/json")

        return Response(data=None, status=status.HTTP_400_BAD_REQUEST)


class EventList(generics.ListCreateAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        return self.request.user.events.all()


class CourseView(APIView):
    def get_object(self, id):
        try:
            return Course.objects.get(id=id)

        except Course.DoesNotExist:
            raise NotFound()

    def get(self, request, id):
        course = self.get_object(id)
        serializer = CourseSerializer(course)
        return Response(serializer.data)

    def delete(self, request, id):
        course = self.get_object(id)
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
