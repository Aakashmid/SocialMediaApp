from .base import *
import dj_database_url
from supabase import create_client
from dotenv import load_dotenv
import os
load_dotenv()

DEBUG = True
SECRET_KEY = 'django-insecure-52sh(q&%=7i)x!**qbx(gu-7)x6pz6egt93@t!#em6s$&=p6wz'

ALLOWED_HOSTS = ["*"]


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
# DATABASES = {
#     'default': dj_database_url.parse(
#         'postgresql://buzzlinedb_user:VHcOBbxxXZneyu1QkcmK4DA9l5oNf9ZP@dpg-cu8eltd2ng1s73ejs6p0-a.singapore-postgres.render.com/buzzlinedb', conn_max_age=600
#     )  # use conn_max_age so that connection from  db remain for given time
# }

CORS_ALLOW_ALL_ORIGINS = True
# CORS_ALLOWED_ORIGINS = [
#     'http://localhost:5173',  # allow specific orign to make request
# ]


MEDIA_URL = 'media/'
MEDIA_ROOT = os.path.join(BASE_DIR.parent, 'media')


# Supabase credentials
# SUPABASE_URL = os.getenv('SUPABASE_URL')

# # Media settings
# MEDIA_URL = f"{SUPABASE_URL}/storage/buckets/media/"  # Adjust 'media' to your bucket name
# DEFAULT_FILE_STORAGE = "Project.supabase_storage_backend.SupabaseStorage"
