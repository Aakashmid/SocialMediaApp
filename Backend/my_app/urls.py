from drf_spectacular.views import SpectacularAPIView , SpectacularSwaggerView
from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from user import views
router=DefaultRouter()

router.register('posts',views.PostviewSet,basename='Post')
# router.register('profile/<int:pk>/',views.ProfileView,basename='Profile')

urlpatterns = [
    path('admin/', admin.site.urls),

     # OpenAPI schema generation endpoint
    path('api/docs/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Swagger UI
    path('api/docs/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),

    # authentication endpoints
    path('api/auth/register/', views.signupHandler),
    path('api/auth/login/', views.loginHandler),
    path('api/auth/logout/', views.logoutHandler),
    
    
    # app specific endpoints
    path('api/users/', include('user.urls')),    # User-related endpoints
    path('api/posts/', include('post.urls')),    # Post-related endpoints
    path('api/comments/', include('comment.urls')),  # Comment-related endpoints
]

