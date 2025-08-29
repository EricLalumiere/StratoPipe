"""
Django settings for stratopipe project.
"""
from pathlib import Path
from dotenv import load_dotenv
load_dotenv(Path(__file__).resolve().parent.parent / '.env')

# Base directory path
BASE_DIR = Path(__file__).resolve().parent.parent

# Secret key for the project
SECRET_KEY = "-zow4qev2dlowv@d2olqpx-ar62a&znanzfh214&x*y-!s1v%w"

# Debug mode enabled
DEBUG = True

# Allowed hosts for the application
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# Installed apps for the project
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Project apps
    'authentication',
    'assets',
    'tasks',
    'collaboration',
    'projects',
    # Third-party apps
    'corsheaders',  # Added for handling CORS
    'rest_framework',
    'versions',
]

# Middleware for request handling
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Added for CORS
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# URL configuration
ROOT_URLCONF = 'stratopipe.urls'

# Template settings
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI application settings
WSGI_APPLICATION = 'stratopipe.wsgi.application'

# Database configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation settings
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization settings
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files configuration
STATIC_URL = '/static/'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Authentication settings
AUTH_USER_MODEL = 'authentication.CustomUser'  # Custom user model

# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',  # Frontend development server
    'http://127.0.0.1:3000',  # Alternate local address
    'http://localhost:63342',  # Allow requests from your frontend
    'http://127.0.0.1:63342',
]

CORS_ALLOW_METHODS = [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'OPTIONS',
]

CORS_ALLOW_CREDENTIALS = True

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / "frontend/public/",
]

# Define the directory where static files will be collected
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Add (or extend) this list to trust the frontend origins for CSRF:
CSRF_TRUSTED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]
