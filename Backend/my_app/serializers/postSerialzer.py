from rest_framework import serializers
from my_app.models import Post,Like,Profile

class PostSerializer(serializers.ModelSerializer):
    comments=serializers.SerializerMethodField()
    likes=serializers.SerializerMethodField()
    class Meta:
        model=Post
        fields=['id','author','text','postImg', 'comments','likes','isLiked','publish_time','updated_time']
        extra_kwargs={'author':{'read_only':True},'isLiked':{'read_only':True}}
        depth=1
    
    def get_comments(self,obj):
        return obj.comments.count()
    
    def get_likes(self,obj):
        return obj.likes.count()
    
    
    

# http   POST http://127.0.0.1:8000/api/posts/  text='helo aakash ' Authorization:'Token token.key'