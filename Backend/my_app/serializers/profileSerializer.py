from rest_framework import serializers
from my_app.models import Profile,Post
from .postSerialzer import PostSerializer

class ProfileSerializer(serializers.ModelSerializer):
    posts=serializers.SerializerMethodField()
    username=serializers.SerializerMethodField()
    class Meta:
        model=Profile
        fields=['id','bio','date_joined','username','posts']
    
    def get_posts(self,obj):
        posts=Post.objects.filter(author=obj)
        serializer=PostSerializer(posts,many=True)
        return serializer.data

    def get_username(self,obj):
        return obj.user.username
