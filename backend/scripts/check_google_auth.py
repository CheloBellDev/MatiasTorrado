from pathlib import Path
import os
from dotenv import load_dotenv
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google.oauth2.credentials import Credentials

# Carga .env desde la raíz del backend
env_path = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(env_path)

SCOPES = ["https://www.googleapis.com/auth/calendar.events"]

def must(name: str) -> str:
    val = os.getenv(name, "").strip()
    if not val:
        raise RuntimeError(f"Falta {name} en .env ({env_path})")
    return val

def main():
    client_id = must("GOOGLE_CLIENT_ID")
    client_secret = must("GOOGLE_CLIENT_SECRET")
    refresh_token = must("GOOGLE_REFRESH_TOKEN")
    cal_id = os.getenv("GOOGLE_CALENDAR_ID", "primary").strip() or "primary"

    creds = Credentials(
        None,
        refresh_token=refresh_token,
        client_id=client_id,
        client_secret=client_secret,
        token_uri="https://oauth2.googleapis.com/token",
        scopes=SCOPES,
    )

    try:
        service = build("calendar", "v3", credentials=creds)
        info = service.calendarList().get(calendarId=cal_id).execute()
        print(f"OK ✅ Acceso a calendario: {info.get('summary')} (id: {info.get('id')})")
    except HttpError as e:
        print("HTTPError ❌", getattr(e, "status_code", "?"), getattr(e, "reason", str(e)))
        if getattr(e, "status_code", None) == 401:
            print("\nCausas típicas 401:")
            print("- CLIENT_ID/SECRET NO coinciden con el refresh_token (distinto cliente/proyecto).")
            print("- Refresh token inválido/revocado o generado con otro scope.")
            print("- La cuenta no está en 'Usuarios de prueba' del Consent Screen.")
            print("- Calendar API habilitada en otro proyecto distinto.")
        raise
    except Exception as e:
        print("Error genérico:", e)
        raise

if __name__ == "__main__":
    main()
