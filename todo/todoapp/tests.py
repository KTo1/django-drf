from django.test import TestCase
from rest_framework import status
from rest_framework.test import force_authenticate, APIRequestFactory
from .models import ToDo, Project
from .views import ToDoModelViewSet, ProjectModelViewSet
from usersapp.models import User


# Create your tests here.
class TestToDoModelViewSet(TestCase):
    def setUp(self) -> None:
        self.url = '/api/todos/'
        self.factory = APIRequestFactory()
        self.format = 'json'
        self.admin = User.objects.create_superuser('kto','kto@kto.ru', 'kto@kto.rukto@kto.ru')
        self.project = Project.objects.create(name='project1', repo='')
        self.data = {'project':self.project.id, 'subject':'subject1', 'user': self.admin.id, 'is_active':True}

    #ApiRequestFactory
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = ToDoModelViewSet.as_view({'get':'list'})
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        request = self.factory.post(self.url, self.data, format=self.format)
        view = ToDoModelViewSet.as_view({'post':'create'})
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        request = self.factory.post(self.url, self.data, format=self.format)
        force_authenticate(request, self.admin)

        view = ToDoModelViewSet.as_view({'post':'create'})
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def tearDown(self) -> None:
        pass


class TestProjectModelViewSet(TestCase):
    def setUp(self) -> None:
        self.url = '/api/projects/'
        self.factory = APIRequestFactory()
        self.format = 'json'
        self.admin = User.objects.create_superuser('kto', 'kto@kto.ru', 'kto@kto.rukto@kto.ru')
        self.data = {'name': 'project1', 'repo': '', 'users': [self.admin.id]}

    #ApiRequestFactory
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = ProjectModelViewSet.as_view({'get':'list'})
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        request = self.factory.post(self.url, self.data, format=self.format)
        view = ProjectModelViewSet.as_view({'post':'create'})
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        request = self.factory.post(self.url, self.data, format=self.format)
        force_authenticate(request, self.admin)

        view = ProjectModelViewSet.as_view({'post':'create'})
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def tearDown(self) -> None:
        pass
