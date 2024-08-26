from django_filters import rest_framework as filters
from .models import Profile
class ProfileFilter(filters.FilterSet):
    username=filters.CharFilter(method='filter_username')
    class Meta:
        model=Profile
        fields=[
            'username',
            'bio'
            ]

    def filter_username(self,queryset,name,value):
        # return [item for item in queryset if value.lower() in item.user.username.lower()]
        return queryset.filter(user__username__icontains=value.lower())