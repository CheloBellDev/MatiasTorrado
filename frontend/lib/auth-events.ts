export const AUTH_EVENT = 'auth:changed';
export function emitAuthChanged(){
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(AUTH_EVENT));
}
export function onAuthChanged(cb: () => void){
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(AUTH_EVENT, cb);
  return () => window.removeEventListener(AUTH_EVENT, cb);
}