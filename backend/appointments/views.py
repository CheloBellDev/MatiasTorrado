from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Appointment
from .serializers import AppointmentSerializer
from .services.google_calendar import create_event

class AppointmentCreateView(generics.CreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]  # Ahora requiere login

    def perform_create(self, serializer):
        instance = serializer.save(user=self.request.user)  # Siempre asigna el usuario logueado
        try:
            created = create_event(
                name=instance.name,
                email=instance.email,
                phone=instance.phone,
                start_iso=instance.start_datetime.isoformat(),
                notes=instance.notes or "",
            )
            instance.status = "confirmed"
            instance.save(update_fields=["status"])
            self.created_event = created
        except Exception as e:
            self.created_event = {"error": str(e)}

    def create(self, request, *args, **kwargs):
        resp = super().create(request, *args, **kwargs)
        if hasattr(self, "created_event"):
            resp.data["calendar"] = self.created_event
        return resp
