from django.contrib.auth.models import User
from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import RegisterSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class MeView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        u = request.user
        return Response({"id": u.id, "username": u.username, "email": u.email})
