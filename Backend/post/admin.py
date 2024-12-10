from django.contrib import admin
from .models import Post , Like  , SavedPost
# Register your models here.

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display=['id','text','publish_time','updated_time','creator']


admin.site.register([Like,SavedPost])

# @admin.register(Like)
# class LikeAdmin(admin.ModelAdmin):
#     pass

