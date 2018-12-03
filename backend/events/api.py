from rest_framework.authentication import (BasicAuthentication,
                                           TokenAuthentication)
from rest_framework import generics, viewsets, permissions, status
from rest_framework_extensions.mixins import NestedViewSetMixin
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from django.shortcuts import get_object_or_404

from events.serializers import SchoolSerializer, TopicSerializer, EventSerializer, CourseSerializer, CategorySerializer, CommentSerializer
from events.models import Event, Course, Topic, School, Category, Comment
from accounts.models import Account
from accounts.serializers import AccountSerializer


class EventViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    authentication_classes = (BasicAuthentication, TokenAuthentication)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)  # IsOwnerOrReadOnly
    filterset_fields = ('campus', 'topic', 'topic__category', 'organizer')
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


class ProfileView(generics.RetrieveUpdateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    authentication_classes = (BasicAuthentication, TokenAuthentication)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

    def get_object(self):
        qs = self.get_queryset()
        if self.request.GET.get('id', None):
            return qs.get(id=self.request.GET['id'])

        if not self.request.user.is_anonymous:
            return qs.get(owner=self.request.user)

        raise NotFound()

    def has_object_permission(self, request, view, account):
        if request.method in permissions.SAFE_METHODS:
            return True
        elif request.user == account.owner:
            return True

        return False


class CommentViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    authentication_classes = (BasicAuthentication, TokenAuthentication)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)  # IsOwnerOrReadOnly
    lookup_field = 'event'

    def perform_create(self, serializer):
        serializer.save(user=self.request.user.account)

    def perform_destroy(self, instance):
        if instance.user == self.request.user.account:
            instance.delete()
        else:
            raise PermissionDenied()

    def get_queryset(self):
        qs = Comment.objects.all()
        event_id = self.request.GET.get('event', None)
        if event_id is not None:
            qs = Comment.objects.filter(event=event_id).order_by('-upvote')
        return qs

    def put(self, request, *args, **kwargs):
        self.update(request, *args, **kwargs)


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
