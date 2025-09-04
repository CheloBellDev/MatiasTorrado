from rest_framework import serializers
from .models import ContactMessage

class ContactMessageSerializer(serializers.ModelSerializer):
    hp = serializers.CharField(write_only=True, required=False, allow_blank=True)   # honeypot
    token = serializers.CharField(write_only=True, required=False, allow_blank=True) # reCAPTCHA opcional

    class Meta:
        model = ContactMessage
        fields = ("id", "name", "email", "phone", "message", "created_at", "hp", "token")
        read_only_fields = ("id", "created_at")

    def validate(self, attrs):
        # Honeypot: si viene relleno, rechazar
        if attrs.get('hp'):
            raise serializers.ValidationError('Spam detectado (honeypot).')
        return attrs
    