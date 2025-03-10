""" WSGI config for stratopipe project. """

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'stratopipe.settings')

application = get_wsgi_application()
