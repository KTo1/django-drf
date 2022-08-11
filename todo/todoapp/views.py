from django.shortcuts import render
from rest_framework.renderers import JSONRenderer, AdminRenderer
from rest_framework.viewsets import ModelViewSet

from .models import Project, ToDo
from .serializers import ProjectHyperlinkedModelSerializer, ToDoModelSerializer


class ProjectModelViewSet(ModelViewSet):
    renderer_classes = [AdminRenderer, JSONRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectHyperlinkedModelSerializer


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
