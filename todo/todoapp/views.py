from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import JSONRenderer, AdminRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Project, ToDo
from .serializers import ProjectHyperlinkedModelSerializer, ToDoModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    # renderer_classes = [AdminRenderer, JSONRenderer]
    # queryset = Project.objects.all()
    serializer_class = ProjectHyperlinkedModelSerializer
    pagination_class = ProjectLimitOffsetPagination

    def get_queryset(self):
        name = self.request.query_params.get('name', '')
        elements = Project.objects.all()
        if name:
            elements = elements.filter(name__contains=name)

        return elements


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ToDoModelViewSet(ModelViewSet):
    # queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = ToDoLimitOffsetPagination

    def destroy(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        if pk:
            element = get_object_or_404(ToDo, pk=pk)
            element.is_active = False
            element.save()

            elements = ToDo.objects.all()
            serializer_class = ToDoModelSerializer(elements, many=True)
            
            return Response(serializer_class.data)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)

    def get_queryset(self):
        project = self.request.query_params.get('project', '')
        elements = ToDo.objects.all()
        if project:
            elements = elements.filter(project=project)

        return elements