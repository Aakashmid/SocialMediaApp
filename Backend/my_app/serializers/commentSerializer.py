from rest_framework import serializers
from .profileSerializer import ProfileSerializer
from my_app.models import Comment,Like,Profile

class CommentSerializer(serializers.ModelSerializer):
    replies=serializers.SerializerMethodField()
    likes=serializers.SerializerMethodField()
    author=ProfileSerializer(read_only=True)
    class Meta:
        model=Comment
        fields=['id','author','post','text','parent','replies','likes','isLiked']
        extra_kwargs={'author':{'read_only':True},'parent':{'read_only':True},'post':{'read_only':True}}

    def get_replies(self,obj):
        '''get replies count'''
        replies=Comment.objects.filter(parent=obj).count()
        return replies
    
    def get_likes(self,obj):
        '''get likes count'''
        likes=Like.objects.filter(Comment=obj).count()
        return likes
    