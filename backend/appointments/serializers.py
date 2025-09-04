from rest_framework import serializers
from .models import Appointment
from django.utils import timezone

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = [
            "id", "name", "email", "phone",
            "start_datetime", "notes", "status"
        ]
        read_only_fields = ("status",)

    def validate(self, attrs):
        if attrs["start_datetime"] < timezone.now():
            raise serializers.ValidationError("La fecha/hora debe ser futura.")
        return attrs

    def create(self, validated_data):
        request = self.context.get("request")
        if request and hasattr(request, "user") and request.user.is_authenticated:
            validated_data["user"] = request.user
        return super().create(validated_data)
