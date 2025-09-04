export type Tokens = { access: string; refresh?: string };

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
let refreshTimer: ReturnType<typeof setTimeout> | null = null;

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  try { return localStorage.getItem('access'); } catch { return null; }
}
export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  try { return localStorage.getItem('refresh'); } catch { return null; }
}
export function saveTokens(t: Tokens){
  if (typeof window === 'undefined') return;
  localStorage.setItem('access', t.access);
  if (t.refresh) localStorage.setItem('refresh', t.refresh);
  scheduleRefresh(t.access, t.refresh ?? getRefreshToken());
}
export function clearTokens(){
  try { localStorage.removeItem('access'); localStorage.removeItem('refresh'); } catch {}
  if (refreshTimer) { clearTimeout(refreshTimer); refreshTimer = null; }
}

function parseExpMs(jwt: string): number | null {
  try {
    const payload = JSON.parse(atob(jwt.split('.')[1]));
    if (!payload?.exp) return null;
    return payload.exp * 1000; // ms
  } catch { return null; }
}

export function scheduleRefresh(access?: string | null, refresh?: string | null){
  if (refreshTimer) { clearTimeout(refreshTimer); refreshTimer = null; }
  if (!access || !refresh) return;
  const expMs = parseExpMs(access);
  if (!expMs) return;
  // refrescar 60s antes del expire (mínimo 1s)
  const delay = Math.max(1000, expMs - Date.now() - 60_000);
  refreshTimer = setTimeout(() => { refreshAccess(); }, delay);
}

export async function refreshAccess(): Promise<string | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;
  try {
    const res = await fetch(`${API_BASE}/api/token/refresh/`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh })
    });
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    if (!data?.access) throw new Error('No access');
    saveTokens({ access: data.access, refresh });
    return data.access as string;
  } catch {
    clearTokens();
    return null;
  }
}

export async function ensureValidAccess(): Promise<string | null> {
  const access = getAccessToken();
  if (!access) return null;
  const expMs = parseExpMs(access);
  if (!expMs) return access;
  // si faltan menos de 60s, refrescar antes de llamar
  if (Date.now() > expMs - 60_000) {
    return await refreshAccess();
  }
  return access;
}

export async function authFetch<T = any>(path: string, init: RequestInit = {}): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  const token = await ensureValidAccess();
  const headers = new Headers(init.headers || {});
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  let res = await fetch(url, { ...init, headers });
  if (res.status === 401) {
    // intenta refrescar una vez y reintenta
    const newToken = await refreshAccess();
    if (newToken) {
      headers.set('Authorization', `Bearer ${newToken}`);
      res = await fetch(url, { ...init, headers });
    }
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  // si la respuesta no es JSON, devolver texto
  const ctype = res.headers.get('content-type') || '';
  return ctype.includes('application/json') ? (await res.json()) : (await res.text() as any);
}

export function bootAuth(){
  // programar refresh si ya hay tokens cargados (al abrir la app)
  if (typeof window === 'undefined') return;
  const a = getAccessToken(); const r = getRefreshToken();
  if (a && r) scheduleRefresh(a, r);
}