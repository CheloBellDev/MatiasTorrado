import os
from datetime import timedelta
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
import datetime

SCOPES = ["https://www.googleapis.com/auth/calendar.events"]

def get_credentials() -> Credentials:
    # usamos refresh token para actuar en nombre del nutricionista
    return Credentials(
        None,
        refresh_token=os.getenv("GOOGLE_REFRESH_TOKEN"),
        client_id=os.getenv("GOOGLE_CLIENT_ID"),
        client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
        token_uri="https://oauth2.googleapis.com/token",
        scopes=["https://www.googleapis.com/auth/calendar"],
    )

def create_event(name: str, email: str, phone: str, start_iso: str, notes: str = "") -> dict:
    creds = get_credentials()
    service = build("calendar", "v3", credentials=creds)

    start_dt = datetime.datetime.fromisoformat(start_iso)
    end_dt = start_dt + timedelta(minutes=50)

    event = {
        "summary": f"Consulta Nutricional – {name}",
        "description": f"Email: {email}\nTel: {phone}\nNotas: {notes}",
        "start": {"dateTime": start_dt.isoformat(), "timeZone": "America/Montevideo"},
        "end": {"dateTime": end_dt.isoformat(), "timeZone": "America/Montevideo"},
        "attendees": [
            {"email": settings.NUTRI_ADMIN_EMAIL}, 
            {"email": email}, # cliente
        ],
        "reminders": {"useDefault": False, "overrides": [
            {"method": "email", "minutes": 24*60},
            {"method": "popup", "minutes": 60},
        ]},
    }
    calendar_id = os.getenv("GOOGLE_CALENDAR_ID", "primary")
    created = service.events().insert(calendarId=calendar_id, body=event, sendUpdates="all").execute()
    return created
