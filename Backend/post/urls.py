from django.urls import path , include
from rest_framework.routers import DefaultRouter
from . import views

router=DefaultRouter()

router.register('',views.PostviewSet,basename='Post')
urlpatterns = [
    path('<int:post_id>/save-unsave/',views.SaveUnsavePostView.as_view() , name='post-save-unsave'),
    path('saved-posts/',views.SavedPostsListView.as_view() ,name="list-saved-posts"),
    path('', include(router.urls)),
]
