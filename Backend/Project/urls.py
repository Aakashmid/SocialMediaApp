
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from my_app import views

urlpatterns = [
    path('admin/', admin.site.urls),

    path('signup/', views.signupHandler),
    path('login/', views.loginHandler),

    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('my_app.urls')),
]

if settings.DEBUG: 
    urlpatterns+=static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
