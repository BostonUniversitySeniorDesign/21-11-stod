from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from .serializers import TagSerializer
from .models import Tag


class TagViewset(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()
