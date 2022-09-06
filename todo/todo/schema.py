import graphene
from graphene import ObjectType
from graphene_django import DjangoObjectType

from todoapp.models import Project, ToDo
from usersapp.models import User


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class Query(ObjectType):
    hello_world = graphene.String(default_value='Hello, World!')

    all_todos = graphene.List(ToDoType)
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)

    user_todos = graphene.List(ToDoType, user_id=graphene.Int(required=False))
    user_project = graphene.List(ProjectType, user_id=graphene.Int(required=False))

    def resolve_all_todos(root, info):
        return ToDo.objects.all()

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_user_todos(root, info, user_id=None):
        if user_id:
            return ToDo.objects.filter(user__id=user_id)
        return None

    def resolve_user_project(root, info, user_id=None):
        if user_id:
            return Project.objects.filter(users__id=user_id)
        return None

schema = graphene.Schema(query=Query)