from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.generics import ListAPIView,RetrieveUpdateAPIView

from .serializers import profileSerializer,postSerialzer,userSerializer  # importing all serializers file and then using there Serializer class 
from .models import Profile,Post,Like, Comment, Follower
# Create your views here.


# for authentication
@api_view(['POST'])
def signupHandler(request):
    data=request.data
    serializer=userSerializer.UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        user=User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        Profile.objects.create(user=user)
        token=Token.objects.create(user=user)
        return Response({'token':token.key,'user':serializer.data})  # serializer.data is all field of user , defined in UserSerializer

    return Response({'error':serializer.errors})
    

@api_view(['POST'])
def loginHandler(request):
    user=get_object_or_404(User,username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({'data':'not found','status':status.HTTP_404_NOT_FOUND})
    
    token ,created=Token.objects.get_or_create(user=user)
    serializer=userSerializer.UserSerializer(instance=user)
    return Response({'token':token.key,'user':serializer.data})



class ProfileListView(ListAPIView):
    queryset=Profile.objects.all()
    serializer_class=profileSerializer.ProfileSerializer

class ProfileDetailView(RetrieveUpdateAPIView):
    queryset=Profile.objects.all()
    serializer_class=profileSerializer.ProfileSerializer
    


class PostviewSet(ModelViewSet):
    serializer_class=postSerialzer.PostSerializer
    queryset=Post.objects.all()
    


