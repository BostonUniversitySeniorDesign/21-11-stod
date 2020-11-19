from rest_framework import viewsets
from .serializers import PostSerializer
from .models import Post


class PostViewset(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

permission_classes = None