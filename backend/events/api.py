from rest_framework.authentication import (BasicAuthentication,
                                           TokenAuthentication)
from rest_framework import generics, viewsets, permissions, status
from rest_framework_extensions.mixins import NestedViewSetMixin
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from django.shortcuts import get_object_or_404

from events.serializers import SchoolSerializer, TopicSerializer, EventSerializer, CourseSerializer, CategorySerializer
from events.models import Event, Course, Topic, School, Category
from accounts.models import Account
from django.contrib.auth.models import User
from accounts.serializers import AccountSerializer,UserSerializer


class EventViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    authentication_classes = (BasicAuthentication, TokenAuthentication)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)  # IsOwnerOrReadOnly
    filterset_fields = ('campus', 'topic', 'topic__category')
    # search_fields = ('description', 'topic', 'campus', 'name')
    # ordering_fields = '__all__'
    # ordering = ('created',)


    def perform_create(self, serializer):
        serializer.save(organizer=self.request.user.account)

    def perform_destroy(self, instance):
        if instance.organizer == self.request.user.account:
            instance.delete()
        else:
            raise PermissionDenied()

    def get_queryset(self):
        qs = Event.objects.all()
        user_id = self.request.GET.get('userId', None)
        if user_id is not None:
            qs = Account.objects.get(owner__id=user_id).events
        return qs


class EventGuestsViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    authentication_classes = (BasicAuthentication, TokenAuthentication)

    def get_event_object(self, request, *args, **kwargs):
        return get_object_or_404(Event, pk=kwargs['parent_lookup_events'])

    def create(self, request, *args, **kwargs):
        event = self.get_event_object(request, *args, **kwargs)
        if event.attendees.count() < event.capacity:
            event.attendees.add(self.request.user.account)
            event = AccountSerializer(event.attendees, many=True).data
            return Response(data=event, status=status.HTTP_200_OK, content_type="application/json")
        return Response(data="sold out!", status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, *args, **kwargs):
        event = self.get_event_object(request, *args, **kwargs)
        try:
            event.attendees.remove(request.user.account)
            return Response("guest dropped", status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data=str(e), status=status.HTTP_404_NOT_FOUND)


# check back later
class ProfileView(generics.RetrieveAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    http_method_names = ('get',)
    # authentication_classes = (BasicAuthentication, TokenAuthentication)

    def get_object(self):
        qs = self.get_queryset()
        if self.request.GET.get('id', None):
            return qs.get(id=self.request.GET['id'])

        if not self.request.user.is_anonymous:
            return qs.get(owner=self.request.user)

        raise NotFound()

class ProfileEditView(generics.RetrieveAPIView):
    # email, first, last, school, major
    queryset = User.objects.all()
    serializer_class = UserSerializer
    http_method_names = ('put',)

    def put(self,request):
        qs = self.get_queryset()
        payload = request.data
        qs.get(id=self.request.GET['id'])
        data = payload

        user = User.objects.get(id=payload['owner'])
        user.name = data['first_name']
        user.last_name= data['last_name']
        user.email= data['email']
        user.save()

        acc = Account.objects.get(owner=user)
        acc.school = data['school']
        acc.major = data['major']
        acc.save()

        acc = Account.objects.get(owner=user)
        ser = AccountSerializer(acc)
        ret = ser.data

        return Response(data=ret, status=status.HTTP_200_OK, content_type='application/json')

class SchoolViewSet(NestedViewSetMixin, viewsets.ReadOnlyModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer


class CourseViewSet(NestedViewSetMixin, viewsets.ReadOnlyModelViewSet):
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
