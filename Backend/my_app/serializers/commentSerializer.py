from rest_framework import serializers
from .profileSerializer import ProfileSerializer
from my_app.models import Comment,Like,Profile

class CommentSerializer(serializers.ModelSerializer):
    replies=serializers.SerializerMethodField()
    likes=serializers.SerializerMethodField()
    isLiked=serializers.SerializerMethodField()
    class Meta:
        model=Comment
        fields=['id','user','post','text','parent','replies','likes','isLiked']

    def get_replies(self,obj):
        '''get replies count'''
        replies=Comment.objects.filter(parent=obj).count()
        return replies
    
    def get_likes(self,obj):
        '''get likes count'''
        likes=Like.objects.filter(Comment=obj).count()
        return likes
    
    def isLiked(self,obj):
        '''checking where current user is liked this comment  or not        '''
        # user=Profile.objects.get(user=self.request.user)
        if Like.objects.filter(Comment=obj,user=user).exists():
            return True
        else:
            return False