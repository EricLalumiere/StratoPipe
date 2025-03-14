""" Views for the collaboration app. """

from rest_framework import viewsets, permissions
from .models import Comment
from .serializers import CommentSerializer


class CommentViewSet(viewsets.ModelViewSet):
    """ ViewSet for the Comment model. """
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # For simplicity, allow users to see all comments (customize as needed)
        return Comment.objects.all()

    def perform_create(self, serializer):
        # Set the comment's author as the current user
        serializer.save(user=self.request.author)
