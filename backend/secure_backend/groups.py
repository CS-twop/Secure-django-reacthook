import os
import django
from django.contrib.auth.models import Group
from django.contrib.auth.models import User

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_rest_permission.settings')


django.setup()

GROUPS = ['moderator', 'user']
MODELS = ['user']

for group in GROUPS:
    new_group, created = Group.objects.get_or_create(name=group)