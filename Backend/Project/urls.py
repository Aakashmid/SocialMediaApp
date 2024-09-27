
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from my_app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/register/', views.signupHandler),
    path('api/auth/login/', views.loginHandler),
    path('api/auth/logout/', views.logoutHandler),
    path('api/', include('my_app.urls')),
]

# handler404 = views.custom_404_view
if settings.DEBUG: 
    urlpatterns+=static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
