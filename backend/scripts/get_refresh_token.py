from google_auth_oauthlib.flow import InstalledAppFlow

def main():
    client_config = {
        "installed": {
            "client_id": "<CLIENT_ID>",
            "client_secret": "<CLIENT_SECRET>",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "redirect_uris": ["http://localhost"]
        }
    }
    flow = InstalledAppFlow.from_client_config(
        client_config,
        scopes=["https://www.googleapis.com/auth/calendar.events"]  # mínimo necesario
    )
    creds = flow.run_local_server(port=0, prompt="consent")
    print("\nREFRESH_TOKEN=", creds.refresh_token)

if __name__ == "__main__":
    main()
