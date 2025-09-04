"""
Contacto: CreateAPIView con anti‑spam y notificación por email.
- Mantiene permisos abiertos (AllowAny).
- Usa throttles (ráfaga/sostenida/email) si están definidos.
- Verifica reCAPTCHA v3 si hay clave en settings; en dev sin clave no bloquea.
- Honeypot (hp) se valida en el serializer.
"""
from __future__ import annotations

from typing import Optional
import requests
from django.conf import settings
from django.core.mail import send_mail
from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import ContactMessage
from .serializers import ContactMessageSerializer

# Throttles opcionales (si existen en el proyecto)
try:  # evita romper en caso de que no estén
    from .throttles import EmailRateThrottle, BurstRateThrottle, SustainedRateThrottle  # type: ignore
    _THROTTLES = [BurstRateThrottle, SustainedRateThrottle, EmailRateThrottle]
except Exception:  # pragma: no cover
    _THROTTLES = []


VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify"


def verify_recaptcha(token: str, remote_ip: Optional[str] = None) -> bool:
    """Valida reCAPTCHA v3 si hay SECRET; en dev (sin SECRET) siempre permite.
    Por qué: evitar rechazos en entornos sin configuración.
    """
    secret = getattr(settings, "RECAPTCHA_SECRET_KEY", "")
    if not secret:
        return True
    if not token:
        return False
    data = {"secret": secret, "response": token}
    if remote_ip:
        data["remoteip"] = remote_ip
    try:
        r = requests.post(VERIFY_URL, data=data, timeout=5)
        j = r.json()
        return bool(j.get("success")) and float(j.get("score", 0.0)) >= 0.3
    except Exception:
        return False


def _client_ip(request) -> Optional[str]:
    # Por qué: algunos proxies setean X-Forwarded-For en producción
    xff = request.META.get("HTTP_X_FORWARDED_FOR")
    if xff:
        return xff.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR")


class ContactCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]
    if _THROTTLES:
        throttle_classes = _THROTTLES  # type: ignore[attr-defined]

    def create(self, request, *args, **kwargs):
        ser = self.get_serializer(data=request.data)
        ser.is_valid(raise_exception=True)

        # reCAPTCHA opcional
        token = ser.validated_data.get("token")
        if not verify_recaptcha(token=token or "", remote_ip=_client_ip(request)):
            return Response({"detail": "captcha_failed"}, status=status.HTTP_400_BAD_REQUEST)

        obj = ser.save()  # hp ya validado en serializer

        # Notificación por email
        subject = "Nuevo contacto — Sitio Nutrición"
        body = (
            f"Nombre: {obj.name}\n"
            f"Email: {obj.email}\n"
            f"Teléfono: {obj.phone or '-'}\n\n"
            f"Mensaje:\n{obj.message}\n"
        )
        try:
            to = [
                getattr(settings, "NUTRI_CONTACT_TO", None)
                or getattr(settings, "NUTRI_ADMIN_EMAIL", None)
            ]
            to = [x for x in to if x]
            if to:
                send_mail(
                    subject,
                    body,
                    getattr(settings, "DEFAULT_FROM_EMAIL", "no-reply@nutriapp.local"),
                    to,
                    fail_silently=False,
                )
        except Exception:
            # En dev con EmailBackend consola igual se imprime; evitamos romper UX del cliente.
            pass

        headers = self.get_success_headers(ser.data)
        return Response({"ok": True}, status=status.HTTP_201_CREATED, headers=headers)
