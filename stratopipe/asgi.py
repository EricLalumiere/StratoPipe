""" ASGI entrypoint file for default Channels application. """

import os
import django
from channels.routing import get_default_application

# Set default settings module and initialize Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'stratopipe.settings')
django.setup()

# Get the default Channels application
application = get_default_application()
