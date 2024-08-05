from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from .serializers import profileSerializer,postSerialzer  # importing all serializers file and then using there Serializer class 
from .models import Profile,Post,Like, Comment, Follower
# Create your views here.

class ProfileViewSet(ModelViewSet):
    queryset=Profile.objects.all()
    serializer_class=profileSerializer.ProfileSerializer

class PostviewSet(ModelViewSet):
    serializer_class=postSerialzer.PostSerializer
    queryset=Post.objects.all()


