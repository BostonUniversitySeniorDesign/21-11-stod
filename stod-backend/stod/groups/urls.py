from django.urls import path, include
from rest_framework import routers
from .views import GroupViewset, UserGroupsAPI

router = routers.DefaultRouter()
router.register('', GroupViewset, "group")

urlpatterns = [
    path('subscribed/', UserGroupsAPI.as_view()),
]

urlpatterns += router.urls
