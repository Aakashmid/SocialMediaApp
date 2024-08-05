from rest_framework import serializers
from my_app.models import Post


class PostSerializer(serializers.ModelSerializer):
    comments=serializers.SerializerMethodField()
    likes=serializers.SerializerMethodField()
    class Meta:
        model=Post
        fields=['id','author','text','comments','likes','postImg','publish_time','updated_time']
    
    def get_comments(self,obj):
        return len(obj.comments.all())
    
    def get_likes(self,obj):
        return len(obj.likes.all())
    
