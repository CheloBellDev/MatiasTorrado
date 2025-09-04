'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authFetch, isLoggedIn, logout } from '../../lib/auth';

interface UserMe {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

export default function AccountPage(){
  const router = useRouter();
  const [user, setUser] = useState<UserMe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn()) { router.replace('/auth/login'); return; }
    (async () => {
      try {
        const me = await authFetch<UserMe>('/api/auth/me/');
        setUser(me);
      } catch (e: any) {
        setError('No se pudo cargar el perfil');
        if (String(e.message || '').includes('401')) router.replace('/auth/login');
      } finally { setLoading(false); }
    })();
  }, [router]);

  if (loading) return (
    <div className="py-16"><p className="text-muted">Cargando tu cuenta…</p></div>
  );

  if (error) return (
    <div className="py-16"><p style={{color:'rgb(255,200,200)'}}>{error}</p></div>
  );

  return (
    <div className="py-12">
      <h1 className="h-sub mb-6">Mi cuenta</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Perfil */}
        <section className="outline-cyan card-dark">
          <h2 className="uppercase tracking-wide text-xl mb-3">Perfil</h2>
          <dl className="grid grid-cols-[140px_1fr] gap-y-2 text-[16px] leading-7">
            <dt className="opacity-80">Usuario</dt><dd>{user?.username}</dd>
            <dt className="opacity-80">Email</dt><dd>{user?.email}</dd>
            <dt className="opacity-80">Nombre</dt><dd>{user?.first_name || '—'}</dd>
            <dt className="opacity-80">Apellido</dt><dd>{user?.last_name || '—'}</dd>
          </dl>
          <div className="mt-6 flex gap-3">
            <Link href="/agendar" className="pill">Agendar turno</Link>
            <button onClick={logout} className="px-4 py-2 border rounded-full hover:bg-white/10">Cerrar sesión</button>
          </div>
        </section>

        {/* Info práctica */}
        <section className="outline-cyan card-dark">
          <h2 className="uppercase tracking-wide text-xl mb-3">Información</h2>
          <ul className="list-disc ml-5 text-[16px] leading-7" style={{color:'#dfe8ff'}}>
            <li>Guardá esta página para revisar tus datos.</li>
            <li>Desde <b>Agendar</b> podés pedir una nueva consulta.</li>
            <li>Si necesitás actualizar datos, escribinos desde <Link className="underline" href="/contacto">Contacto</Link>.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
