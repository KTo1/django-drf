from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory
from .models import User
from .views import UserModelViewSet


# Create your tests here.
class TestUserModelViewSet(TestCase):
    def setUp(self) -> None:
        self.factory = APIRequestFactory()
        self.url = '/api/users/'
        self.format = 'json'
        self.data = {'username':'kto1', 'email':'kto1@kto.ru', 'password':'kto1@kto.ru'}

    #ApiRequestFactory
    def test_get_list(self):
        request =self.factory.get(self.url)
        view = UserModelViewSet.as_view({'get':'list'})
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    #Создавать пользователей запрещено
    def test_create_guest(self):
        pass
        # request = self.factory.post(self.url, self.data, format=self.format)
        # view = UserModelViewSet.as_view({'post':'create'})
        # response = view(request)
        #
        # self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def tearDown(self) -> None:
        pass

