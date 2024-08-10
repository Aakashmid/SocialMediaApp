from rest_framework import serializers
from .profileSerializer import ProfileSerializer
from my_app.models import Comment

class CommentSerializer(serializers.ModelSerializer):
    user=ProfileSerializer(read_only=True)
    replies=serializers.SerializerMethodField()
    class Meta:
        model=Comment
        fields=['id','user','post','text']


    def get_replies(self,obj):
        return Comment.objects.filter(parent=obj)