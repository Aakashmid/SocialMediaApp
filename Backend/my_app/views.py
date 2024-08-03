from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from .serializers import PostSerialier,ProfileSerializer,CommentSerializer,LikeSerializer,FollowerSerializer
from .models import Profile,Post,Like, Comment, Follower
# Create your views here.

class ProfileViewSet(ModelViewSet):
    queryset=Profile.objects.all()
    serializer_class=ProfileSerializer

class PostviewSet(ModelViewSet):
    serializer_class=PostSerialier
    queryset=Post.objects.all()


