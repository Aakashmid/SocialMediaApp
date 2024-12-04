from rest_framework import serializers 
from rest_framework.exceptions import ValidationError
from .models import Post , Like
from user.serializers import ProfileSerializer

class PostSerializer(serializers.ModelSerializer):
    comments_count=serializers.SerializerMethodField()
    likes_count=serializers.SerializerMethodField()
    isLiked=serializers.SerializerMethodField()
    creator=ProfileSerializer(read_only=True)
    class Meta:
        model=Post
        fields=['id','creator','text','postImg', 'comments_count','likes_count','isLiked','is_public', 'publish_time','updated_time']
        extra_kwargs={'creator':{'read_only':True},'isLiked':{'read_only':True}}
    
    def get_comments_count(self,post):
        return post.comments.count()
    
    def get_likes_count(self,post):
        return post.likes.count()
    def get_isLiked(self,post):
        '''get whether comment is liked by current user of not'''
        request = self.context.get('request')
        if request.user.is_anonymous:
            return False
        elif Like.objects.filter(post=post, user=request.user.profile).exists():
            return True
        return False
