from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from todo.usersapp.models import User
from todo.usersapp.serializers import UserModelSerializer


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

