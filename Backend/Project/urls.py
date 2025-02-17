from django.contrib import admin
from django.urls import path, include
from django.conf import settings

# from django.conf.urls import handler404
from django.conf.urls.static import static
from user.views import signupHandler, loginHandler, logoutHandler, checkServerStatus
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

# handler404 = views.custom_404_view
handler404 = 'user.views.custom_404_view'  # works only when debug is false
# handler500 = 'user.views.custom_500_view'  # works only when debug is false

urlpatterns = [
    path('admin/', admin.site.urls),
    # OpenAPI schema generation endpoint
    path('api/docs/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Swagger UI
    path('api/docs/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/check-server-status/', checkServerStatus),
    # authentication endpoints
    path('api/auth/register/', signupHandler),
    path('api/auth/login/', loginHandler),
    path('api/auth/logout/', logoutHandler),
    # app specific endpoints
    path('api/users/', include('user.urls')),  # User-app endpoints
    path('api/posts/', include('post.urls')),  # Post-app endpoints
    path('api/comments/', include('comment.urls')),  # Comment-app  endpoints
]   

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
