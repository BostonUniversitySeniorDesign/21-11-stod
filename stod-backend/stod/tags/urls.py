from django.urls import path, include
from rest_framework import routers
from .views import TagViewset

router = routers.DefaultRouter()
router.register('', TagViewset, "tags")

urlpatterns = []

urlpatterns += router.urls
