from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from djangorestframework_camel_case.render import CamelCaseJSONRenderer

from usersapp.models import User
from usersapp.serializers import UserModelSerializer


class UserModelViewSet(ModelViewSet):
    renderer_classes = [CamelCaseJSONRenderer]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

