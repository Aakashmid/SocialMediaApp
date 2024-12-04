from rest_framework import serializers
from user.serializers import ProfileSerializer
from post.models import Like
from rest_framework.exceptions import ValidationError



class CommentSerializer(serializers.ModelSerializer):
    replies=serializers.SerializerMethodField()
    likes=serializers.SerializerMethodField()
    isLiked=serializers.SerializerMethodField()
    user=ProfileSerializer(read_only=True)
    class Meta:
        model=Comment
        fields=['id','user','post','text','parent','replies','likes','isLiked']
        extra_kwargs={'user':{'read_only':True},'parent':{'read_only':True},'post':{'read_only':True}}

    def get_replies(self,comment):
        '''get replies count'''
        replies=Comment.objects.filter(parent=comment).count()
        return replies
    
    def get_likes(self,comment):
        '''get likes count'''
        likes=Like.objects.filter(comment=comment).count()
        return likes
    
    def get_isLiked(self,comment):
        '''get whether comment is liked by current user of not'''
        request = self.context.get('request')
        if request.user.is_anonymous:
            return False
        elif Like.objects.filter(comment=comment, user=request.user.profile).exists():
            return True
        return False
