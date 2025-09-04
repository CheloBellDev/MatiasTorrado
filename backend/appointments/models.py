from django.conf import settings
from django.db import models

class Appointment(models.Model):
    STATUS_CHOICES = (
        ("pending", "Pendiente"),
        ("confirmed", "Confirmada"),
        ("cancelled", "Cancelada"),
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=40)
    start_datetime = models.DateTimeField()
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} @ {self.start_datetime}"
