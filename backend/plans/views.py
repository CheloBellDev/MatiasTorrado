from rest_framework import viewsets, permissions
from .models import Plan
from .serializers import PlanSerializer

class PlanViewSet(viewsets.ModelViewSet):
    queryset = Plan.objects.all().order_by("-id")
    serializer_class = PlanSerializer
    permission_classes = [permissions.AllowAny]
