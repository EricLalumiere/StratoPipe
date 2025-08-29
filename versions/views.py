# Python
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .constants import STATUS_CHOICES, STATUS_VALUES

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_statuses(request):
    return Response({
        'choices': [{'key': k, 'label': v} for k, v in STATUS_CHOICES],
        'values': STATUS_VALUES,
    })