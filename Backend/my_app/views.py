from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.generics import ListAPIView,RetrieveUpdateAPIView,ListCreateAPIView,CreateAPIView
from rest_framework.filters import SearchFilter
from rest_framework.permissions import AllowAny

from .serializers import profileSerializer,postSerialzer,userSerializer ,commentSerializer # importing all serializers file and then using there Serializer class 
from .models import Profile,Post,Like, Comment, Follower
from django.shortcuts import redirect
# Create your views here.


# for authentication
@api_view(['POST'])
@permission_classes([AllowAny])
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
@permission_classes([AllowAny])
def loginHandler(request):
    user=get_object_or_404(User,username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({'data':'not found','status':status.HTTP_404_NOT_FOUND})
    
    token ,created=Token.objects.get_or_create(user=user)
    serializer=userSerializer.UserSerializer(instance=user)
    return Response({'token':token.key,'user':serializer.data})


#  list searched users
class ProfileListView(ListAPIView):
    queryset=Profile.objects.all()
    serializer_class=profileSerializer.ProfileSerializer

    search_fields=['username','bio']  # search profiles by username or bio
    filter_backends=[SearchFilter]


class ProfileDetailView(RetrieveUpdateAPIView):
    serializer_class=profileSerializer.ProfileSerializer

    def get(self, request, *args, **kwargs):
        profile=Profile.objects.get(user=request.user)
        serializer=self.serializer_class(profile,many=True)
        return Response(serializer.data)
    
    # def perform_update(self, serializer):
    #     profile=Profile.objects.get(user=self.request.user)
    #     if serializer.
    
        

class PostviewSet(ModelViewSet):
    serializer_class=postSerialzer.PostSerializer
    queryset=Post.objects.all()

    search_fields=['text','author']
    filter_backends=[SearchFilter]
    def perform_create(self, serializer):
        '''
        assining author of post  current user 
        '''
        if serializer.is_valid():
            author=get_object_or_404(Profile,user=self.request.user)
            serializer.save(author=author)
            

class  CommentListCreate(ListCreateAPIView):
    serializer_class=commentSerializer.CommentSerializer

    def get_queryset(self):
        """
        This view  return a list of all comments or replies of a post or comment , specified postId in url
        """
        postId=self.kwargs['postId']
        commentId=self.kwargs.get('commentId',None)
        if commentId is None:
            queryset=Comment.objects.filter(post__id=postId)
        else:
            queryset=Comment.objects.filter(post__id=postId,parent=self.kwargs['commentId'])

        return queryset
    

    
    def perform_create(self, serializer):
        post = get_object_or_404(Post, id=self.kwargs['postId'])  # Get the Post by postId
        user = get_object_or_404(Profile, user=self.request.user)  # Get the Profile of the current user

        if self.kwargs.get('commentId', None) is not None:
            parent = get_object_or_404(Comment, id=self.kwargs['commentId'])

        # Save the comment with the related post, author, and parent (if provided)
        serializer.save(post=post, author=user, parent=parent)
        
        