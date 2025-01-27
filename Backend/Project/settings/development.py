from .base import *

DEBUG = True
SECRET_KEY = 'django-insecure-52sh(q&%=7i)x!**qbx(gu-7)x6pz6egt93@t!#em6s$&=p6wz'

ALLOWED_HOSTS = ["*"]


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

CORS_ALLOW_ALL_ORIGINS = True
# CORS_ALLOWED_ORIGINS = [
#     'http://localhost:5173',  # allow specific orign to make request
# ]
