import json

# from django.conf import settings
# from django.db.models import Q
# from rest_framework import generics
# from django.contrib.auth.models import AnonymousUser
from django.contrib.auth.models import User
from rest_framework.authentication import (BasicAuthentication,
                                           SessionAuthentication,
                                           TokenAuthentication)
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token as REST_Token
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.decorators import (api_view, authentication_classes,
                                       permission_classes)
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Student, Token
from .serializers import UserSerializer
from .utils import generate_tokens


class SignupView(APIView):
    authentication_classes = (BasicAuthentication, TokenAuthentication)

    def post(self, request):
        payload = json.loads(request.body.decode('utf-8'), encoding='utf-8')
        user = User.objects.create_user(**payload, is_active=False)
        user_object = UserSerializer(user).data
        return Response(data=user_object, status=200, content_type='json')


class UserView(APIView):
    authentication_classes = (BasicAuthentication, TokenAuthentication)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = UserSerializer(request.user).data
        return Response(data=user, status=200, content_type='json')

    def post(self):
        pass


class CustomAuthToken(ObtainAuthToken):
    authentication_classes = (TokenAuthentication, BasicAuthentication)
    permission_classes = (AllowAny,)
    parser_classes = (JSONParser,)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = REST_Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
        }, status=200, content_type='json')


@api_view(['GET'])
@authentication_classes((SessionAuthentication, BasicAuthentication))
@permission_classes((IsAuthenticatedOrReadOnly,))
def verify_token(request):
    auth = {}
    status = 401

    try:
        token_obj = Token.objects.get(token=request.GET['token'])
        token_val = token_obj.token
        auth = {}
        status = 200
        if token_obj.type == 'reg':
            auth = {
                'authenticated': True,
                'token': str(token_val),
                'username': None,
            }

            return Response(data={'auth': auth}, status=status, content_type='json')

    except Exception as err:
        return Response(data=None, status=500, content_type='json')


class RegistrationView(APIView):
    authentication_classes = (BasicAuthentication, TokenAuthentication)
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request):
        return Response(data=None, status=404)

    def post(self, request):
        try:
            data = json.loads(request.body.decode('utf-8'))
            tokens = generate_tokens(data, 'reg')
            return Response(data={'tokens': tokens}, status=200, content_type='json')
        except Exception as err:
            print(err)
            return Response(data=None, status=500, content_type='json')
