from django.contrib import admin
from .models import Appointment

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "start_datetime", "status", "created_at")
    list_filter = ("status",)
