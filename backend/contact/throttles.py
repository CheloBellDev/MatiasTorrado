from rest_framework.throttling import SimpleRateThrottle, ScopedRateThrottle

class EmailRateThrottle(SimpleRateThrottle):
    scope = 'contact_email'
    def get_cache_key(self, request, view):
        if request.method != 'POST':
            return None
        email = (request.data.get('email') or '').strip().lower()
        if not email:
            return None
        ident = f"email:{email}"
        return self.cache_format % {
            'scope': self.scope,
            'ident': ident,
        }

class BurstRateThrottle(ScopedRateThrottle):
    scope = 'contact_burst'

class SustainedRateThrottle(ScopedRateThrottle):
    scope = 'contact_day'