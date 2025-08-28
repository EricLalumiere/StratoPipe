# Python
# Append the following class to the end of the file (or after the other CBVs).
from rest_framework.views import APIView

class AssetVersionsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        asset = get_object_or_404(Asset, pk=pk, owner=request.user)
        data = [
            {
                'id': v.id,
                'number': v.number,
                'file': (v.file.url if hasattr(v.file, 'url') else v.file.name),
                'description': v.description,
                'user': v.user_id,
                'created_at': v.created_at,
            }
            for v in asset.versions.order_by('number')
        ]
        return Response({'asset': asset.id, 'versions': data}, status=status.HTTP_200_OK)