from rest_framework.authentication import (BasicAuthentication,
                                           TokenAuthentication)
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token as REST_Token
from rest_framework.permissions import IsAuthenticatedOrReadOnly
# from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import AccountSerializer
from .models import Account
import uuid


class SignupView(APIView):
    http_method_names = ['post']

    def post(self, request):
        payload = request.data
        payload['username'] = payload.get('username', None) or uuid.uuid4().hex
        data = dict([(k, payload.pop(k, None)) for k in ['school', 'year', 'major']])
        data['owner'] = payload
        account_serializer = AccountSerializer(data=data)
        if account_serializer.is_valid(raise_exception=True):
            account_serializer.save()

        return Response(data=account_serializer.data, status=status.HTTP_201_CREATED, content_type='application/json')


class AuthenticationView(ObtainAuthToken):
    http_method_names = ['post']

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


class EmailConfirmationView(APIView):
    authentication_classes = (BasicAuthentication, TokenAuthentication)
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request):
        try:
            account = Account.objects.get(reg_key=request.GET['id'])
            if account.owner.is_active:
                return Response(status=status.HTTP_409_CONFLICT, content_type='application/json')

            User.objects.filter(account=account).update(is_active=True)
            return Response(status=status.HTTP_200_OK, content_type='application/json')

        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_404_NOT_FOUND, content_type="application/json")
