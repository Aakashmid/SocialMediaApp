from django.contrib import admin
from .models import Post , Like  , SavedPost
# Register your models here.

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display=['id','text','publish_time','updated_time','creator']


# admin.site.register([Like,SavedPost])

@admin.register(SavedPost)
class SavedPostAdmin(admin.ModelAdmin):
    list_display=['id','user','post']

@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display=['id','post_id','user' ,'comment_id']

    def post_id(self,obj):
        return obj.post.id if obj.post else None
    post_id.short_description = 'Post ID'
    def comment_id(self,obj):
        return obj.comment.id if obj.comment else None
    comment_id.short_description = 'Comment ID'
