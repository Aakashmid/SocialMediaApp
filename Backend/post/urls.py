from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

router.register('', views.PostviewSet, basename='Post')
urlpatterns = [
    path('<int:post_id>/toggle-save/', views.SaveUnsavePostView.as_view(), name='post-save-unsave'),
    path('saved-posts/', views.ProfilePostsViewSet.as_view({'get': 'saved_posts'}), name="list-saved-posts"),
    path('profile-posts/<int:user_id>', views.ProfilePostsViewSet.as_view({'get': 'profile_posts'}), name="list-profile-posts"),
    path('', include(router.urls)),
]
