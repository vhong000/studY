from rest_framework.authentication import (BasicAuthentication,
                                           SessionAuthentication,
                                           TokenAuthentication)
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token as REST_Token
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.parsers import JSONParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import StudentSerializer
from .models import Student
import uuid
import json


class SignupView(APIView):
    authentication_classes = (BasicAuthentication, TokenAuthentication)

    def post(self, request):
        payload = json.loads(request.body.decode('utf-8'), encoding='utf-8')
        payload['username'] = payload.get('username', None) or uuid.uuid4().hex
        data = dict([(k, payload.pop(k, None)) for k in ['school', 'year', 'major']])
        data['user_profile'] = payload
        student_serializer = StudentSerializer(data=data)
        if student_serializer.is_valid(raise_exception=True):
            student_serializer.save()

        return Response(data=student_serializer.data, status=status.HTTP_201_CREATED, content_type='application/json')

    def get(self, request):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


class UserView(APIView):
    authentication_classes = (BasicAuthentication, TokenAuthentication)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        student = StudentSerializer(Student.objects.get(user_profile=request.user)).data
        return Response(data=student, status=status.HTTP_200_OK, content_type='application/json')

    def post(self):
        pass


class CustomAuthToken(ObtainAuthToken):
    authentication_classes = (TokenAuthentication, BasicAuthentication)
    permission_classes = (AllowAny,)
    parser_classes = (JSONParser, FormParser)

    def post(self, request, *args, **kwargs):
        request.data['username'] = request.data['email']
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = REST_Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
        }, status=status.HTTP_200_OK, content_type='application/json')

    def get(self, request):
        return Response(data=None, status=status.HTTP_405_METHOD_NOT_ALLOWED)


class RegistrationView(APIView):
    authentication_classes = (BasicAuthentication, TokenAuthentication)
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request):
        try:
            student = Student.objects.get(reg_key=request.GET['id'])
            if student.user_profile.is_active:
                return Response(status=status.HTTP_409_CONFLICT, content_type='application/json')

            User.objects.filter(student_profile=student).update(is_active=True)
            return Response(status=status.HTTP_200_OK, content_type='application/json')

        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_404_NOT_FOUND, content_type="application/json")
