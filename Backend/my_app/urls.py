
from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views

router=DefaultRouter()

router.register('posts',views.PostviewSet,basename='Post')
router.register('profile',views.ProfileViewSet,basename='Profile')

urlpatterns = [
    path('', include(router.urls)),
]
