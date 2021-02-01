from rest_framework import routers
from .views import PostViewset, CommentViewset
from django.urls import include, path
from . import views
from django.conf.urls import url

router = routers.DefaultRouter()
router.register(r"posts", PostViewset, "posts")
router.register("comments", CommentViewset, "comments")
urlpatterns = router.urls
