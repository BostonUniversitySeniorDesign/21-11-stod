from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import GroupSerializer
from .models import Group


class GroupViewset(viewsets.ModelViewSet):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
