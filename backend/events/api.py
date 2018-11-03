# from rest_framework.authentication import (BasicAuthentication,
#                                            SessionAuthentication,
#                                            TokenAuthentication)
from rest_framework import generics, viewsets, views, permissions, status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from django.db.models import Q
from django.conf import settings

from events.serializers import SchoolSerializer, TopicSerializer, EventSerializer, CourseSerializer, CategorySerializer
from events.models import Event, Course, Topic, School, Category
from accounts.models import Account
from accounts.serializers import AccountSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)  # IsOwnerOrReadOnly
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
            event = AccountSerializer(event.attendees, many=True).data
            return Response(data=event, status=status.HTTP_200_OK, content_type="application/json")

        return Response(data="sold out!", status=status.HTTP_400_BAD_REQUEST)


class ProfileView(generics.RetrieveAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_object(self):
        qs = self.get_queryset()
        if self.request.GET.get('id', None):
            return qs.get(id=self.request.GET['id'])

        if not self.request.user.is_anonymous:
            print(self.request.user)
            return qs.get(owner=self.request.user)

        raise NotFound()


class SchoolViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    filterset_fields = ('dept',)


class TopicView(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    http_method_names = ['get']
    serializer_class = TopicSerializer


class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    http_method_names = ['get']
    serializer_class = CategorySerializer


class EventList(generics.ListAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        return self.request.user.events.all()
