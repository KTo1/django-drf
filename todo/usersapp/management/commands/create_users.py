from django.core.management.base import BaseCommand

from usersapp.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.all().delete()
        User.objects.create_superuser('kto', 'kto@kto.ru', '1')

        for i in range(6):
            User.objects.create_user(f'kto{i}', f'kto{i}@kto.ru', 6 * str(i))

