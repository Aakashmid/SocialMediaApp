from .base import *
from dotenv import load_dotenv
from supabase import create_client
import os

load_dotenv()

DEBUG = False
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')

# static files (CSS, JavaScript, Images)
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com']
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '*').replace(' ', '').split(',')


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}


# Supabase credentials
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')  # Use service role key for full access

# Initialize Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Media settings

# Media settings
MEDIA_URL = f"{SUPABASE_URL}/storage/buckets/media/"  # Adjust 'media' to your bucket name
DEFAULT_FILE_STORAGE = "Project.supabase_storage_backend.SupabaseStorage"


# CORS settings
CORS_ALLOWED_ORIGINS = os.getenv('CORS_ALLOWED_ORIGINS', 'http://localhost:5173').split(',')
CORS_ALLOW_ALL_ORIGINS = os.getenv('CORS_ALLOW_ALL_ORIGINS', 'True') == 'True'


# for logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'myapp': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'DEBUG',
    },
}
