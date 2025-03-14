""" This file is used to configure the app name. """
from django.apps import AppConfig


class TasksConfig(AppConfig):
    """ Specify the app name. """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'tasks'
