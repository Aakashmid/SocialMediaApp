from rest_framework import serializers
from my_app.models import Post


class PostSerializer(serializers.ModelSerializer):
    comments=serializers.SerializerMethodField()
    likes=serializers.SerializerMethodField()
    # author=serializers.StringRelatedField()
    class Meta:
        model=Post
        fields=['id','author','text','postImg', 'comments','likes','publish_time','updated_time']
    
    def get_comments(self,obj):
        return len(obj.comments.all())
    
    def get_likes(self,obj):
        return len(obj.likes.all())
    

# http   POST http://127.0.0.1:8000/posts/ author='aakash' text='helo aakash '