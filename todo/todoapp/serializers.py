from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Project, ToDo


class ProjectHyperlinkedModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ['name', 'repo', 'users']


class ToDoModelSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        fields = ['project', 'subject', 'user', 'created', 'updated', 'is_active']