from rest_framework import routers
from .views import PostViewset
from django.urls import include, path

router = routers.DefaultRouter()
router.register("", PostViewset, "posts")

urlpatterns = router.urls