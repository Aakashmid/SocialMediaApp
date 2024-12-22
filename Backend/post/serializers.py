from rest_framework import serializers 
from rest_framework.exceptions import ValidationError
from .models import Post , Like , SavedPost
from user.serializers import PostProfileReadSerializer

class PostSerializer(serializers.ModelSerializer):
    comments_count=serializers.SerializerMethodField()
    likes_count=serializers.SerializerMethodField()
    isLiked=serializers.SerializerMethodField()
    isSaved=serializers.SerializerMethodField()
    creator = PostProfileReadSerializer(read_only= True)
    class Meta:
        model=Post
        fields=['id','creator','text','postImg', 'comments_count','likes_count','isLiked','isSaved','is_public', 'publish_time','updated_time']
        extra_kwargs={'creator':{'read_only':True}}
    
    def get_comments_count(self,post):
        return post.comments.filter(parent=None).count()
    
    def get_likes_count(self,post):
        return post.likes.count()
    def get_isLiked(self,post):
        '''get whether post is liked by current user of not'''
        request = self.context.get('request')
        if request.user.is_anonymous:
            return False
        elif Like.objects.filter(post=post, user=request.user.profile).exists():
            return True
        return False
    
    def get_isSaved(self,post):
        '''get whether this  post  is saved by current user of not'''
        request = self.context.get('request')
        if request.user.is_anonymous:
            return False
        elif SavedPost.objects.filter(post=post, user=request.user.profile).exists():
            return True
        return False



# class SavePostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model= SavedPost
#         fields = '__all__'
