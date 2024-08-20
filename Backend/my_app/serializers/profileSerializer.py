from rest_framework import serializers
from my_app.models import Profile,Post
from .postSerialzer import PostSerializer

class ProfileSerializer(serializers.ModelSerializer):
    posts=serializers.SerializerMethodField()
    username=serializers.SerializerMethodField()
    full_name=serializers.SerializerMethodField()
    class Meta:
        model=Profile
        fields=['id','bio','date_joined','full_name','username','posts']
    
    def get_posts(self,obj):
        posts=Post.objects.filter(author=obj)
        serializer=PostSerializer(posts,many=True)
        return serializer.data
    def get_full_name(self,obj):
        return obj.user.first_name + ' ' +obj.user.last_name

    def get_username(self,obj):
        return obj.user.username
