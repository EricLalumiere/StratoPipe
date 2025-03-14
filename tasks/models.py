""" Define the Task model. """
from django.db import models
from django.conf import settings  # Import settings to access AUTH_USER_MODEL
from projects.models import Project

class Task(models.Model):
    """ Represents a task within a project. """
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ]

    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,  # Use settings.AUTH_USER_MODEL here
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assigned_tasks'
    )
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,  # Use settings.AUTH_USER_MODEL here
        on_delete=models.CASCADE,
        related_name='created_tasks'
    )
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='tasks'
    )
    status = models.CharField(max_length=20,
                              choices=STATUS_CHOICES,
                              default='open')
    due_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        """ Returns the task name when the object is printed. """
        return str(self.name)
