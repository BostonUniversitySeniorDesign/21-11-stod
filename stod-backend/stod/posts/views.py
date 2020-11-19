from rest_framework import viewsets
from .serializers import PostSerializer, CommentSerializer
from .models import Post, Comment


class PostViewset(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()


permission_classes = None


class CommentViewset(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
