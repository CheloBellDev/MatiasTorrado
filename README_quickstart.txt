Backend Django — NutriApp

1) Crear entorno y deps
   cd backend
   python -m venv venv
   venv\Scripts\activate   # Windows
   # source venv/bin/activate # macOS/Linux
   pip install -r requirements.txt
   cp .env.example .env      # o copiar manualmente
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py runserver 0.0.0.0:8000

2) Variables .env (Google Calendar)
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   GOOGLE_REFRESH_TOKEN=...
   GOOGLE_CALENDAR_ID=primary

3) Endpoints
   POST /api/auth/register/
   POST /api/token/     (username/password -> access/refresh)
   GET  /api/plans/     (lista)
   POST /api/plans/     (crear - requiere auth si lo protegés)
   POST /api/appointments/  (crea cita y envía a Google Calendar)

Zona horaria: America/Montevideo
