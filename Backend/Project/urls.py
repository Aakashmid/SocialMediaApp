
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
# from django.conf.urls import handler404
from django.conf.urls.static import static
from my_app import views
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

# handler404 = views.custom_404_view
handler404 = 'my_app.views.custom_404_view'   # works only when debug is false

urlpatterns = [
    path('admin/', admin.site.urls),

     # OpenAPI schema generation endpoint
    path('api/docs/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Swagger UI
    path('api/docs/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),

    # my project api endpoints
    path('api/auth/register/', views.signupHandler),
    path('api/auth/login/', views.loginHandler),
    path('api/auth/logout/', views.logoutHandler),
    path('api/', include('my_app.urls')),

]

if settings.DEBUG: 
    urlpatterns+=static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
