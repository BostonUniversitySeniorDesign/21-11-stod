from rest_framework import routers
from .views import FriendRequestView, FriendRequestViewAccept, FriendRequestViewDecline, FriendListView
from django.urls import include, path
from django.conf.urls import url

router = routers.DefaultRouter()
router.register(r"", FriendRequestView, basename="")
router.register(r"accept", FriendRequestViewAccept, basename="accept")
router.register(r"decline", FriendRequestViewDecline, basename="decline")
router.register(r"list", FriendListView, basename="list")
# router.register(r"friends_action", FriendRequestView.accept_friend_request, basename="friends_action")

urlpatterns = router.urls
