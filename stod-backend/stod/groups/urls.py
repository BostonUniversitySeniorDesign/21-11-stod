from django.urls import path
from rest_framework import routers
from .views import GroupViewset

router = routers.DefaultRouter()
router.register("test", GroupViewset, "group")

urlpatterns = router.urls
