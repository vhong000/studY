from rest_framework.authentication import (BasicAuthentication,
                                           TokenAuthentication)
from rest_framework import generics, viewsets, permissions, status
from rest_framework_extensions.mixins import NestedViewSetMixin
from rest_framework.mixins import UpdateModelMixin
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from django.shortcuts import get_object_or_404

from events.serializers import SchoolSerializer, TopicSerializer, EventSerializer, CourseSerializer, CategorySerializer,CommentSerializer
from events.models import Event, Course, Topic, School, Category, Comment
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
class ProfileView(UpdateModelMixin,generics.RetrieveAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    lookup_field = 'school'
    # authentication_classes = (BasicAuthentication, TokenAuthentication)

    def get_object(self):
        qs = Account.objects.all()
        user_id = self.request.GET.get('id', None)
        if user_id is not None:
            qs = Account.objects.get(owner__id=user_id)
        else:
            qs = Account.objects.get(owner=self.request.user)
        return qs

        raise NotFound()
        
    def put(self,request):
        id = request.data.get('id',None)
        user = User.objects.get(id=id)
        user.first_name = request.data.get('first_name',None)
        user.last_name = request.data.get('last_name',None)
        user.email = request.data.get('email',None)
        user.set_password(request.data.get('password',None))
        user.save()

        account = Account.objects.get(owner=user)
        sch = request.data.get('school',None)
        school = School.objects.get(id=sch)
        account.school = school
        account.major = request.data.get('major',None)
        account.save()

        qs =  Account.objects.get(owner=self.request.user)
        ser = AccountSerializer(qs)
        return Response(data=ser.data,status=status.HTTP_200_OK)

        
        # self.update(request,*args,**kwargs)
        
class CommentViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    authentication_classes = (BasicAuthentication, TokenAuthentication)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)  # IsOwnerOrReadOnly
    lookup_field = 'event'

    def perform_create(self, serializer):
        serializer.save(user=self.request.user.account)

    def perform_destroy(self, instance):
        if instance.user== self.request.user.account:
            instance.delete()
        else:
            raise PermissionDenied()

    def get_queryset(self):
        qs = Comment.objects.all()
        event_id= self.request.GET.get('event', None)
        if event_id is not None:
            qs = Comment.objects.filter(event=event_id).order_by('-upvote')
        return qs

    def put(self,request,*args,**kwargs):
        self.update(request,*args,**kwargs)


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

