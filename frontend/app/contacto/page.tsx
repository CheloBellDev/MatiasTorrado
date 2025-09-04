"use client";

import { useState } from "react";
import Script from "next/script";

export default function ContactoPage(){
  // estado del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  // anti‑spam
  const [hp, setHp] = useState(""); // honeypot invisible

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  const MAP = process.env.NEXT_PUBLIC_MAP_EMBED_URL || "https://www.google.com/maps?q=Consultorio%20Nutricion&output=embed";
  const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string | undefined;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault(); setErr(null); setOk(false); setLoading(true);
    try{
      let token: string | undefined;
      if (SITE_KEY && typeof window !== 'undefined' && (window as any).grecaptcha) {
        token = await (window as any).grecaptcha.execute(SITE_KEY, { action: 'contact' });
      }

      const res = await fetch(`${API_BASE}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, hp, token }),
      });

      if(!res.ok){
        const t = await res.text();
        setErr(`Error ${res.status}: ${t || "no se pudo enviar"}`);
        return;
      }

      setOk(true);
      setName(""); setEmail(""); setPhone(""); setMessage(""); setHp("");
    }catch{
      setErr("Error de conexión");
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="h-sub mb-4">Contacto</h1>
      <p className="text-muted max-w-2xl mb-8">Escribinos para coordinar una consulta, resolver dudas sobre los programas o conocer la disponibilidad del consultorio.</p>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Formulario */}
        <section className="outline-cyan card-dark">
          <h2 className="uppercase tracking-wide text-xl mb-4">Dejanos tu mensaje</h2>
          {ok && (
            <div className="mb-4 rounded-xl border border-[rgba(127,231,255,.45)] bg-[rgba(23,60,120,.35)] px-4 py-3">
              ¡Gracias! Te responderemos a la brevedad.
            </div>
          )}
          {err && (
            <div className="mb-4 rounded-xl border border-red-400/60 bg-red-900/30 px-4 py-3 text-red-200">
              {err}
            </div>
          )}

          <form onSubmit={onSubmit} className="grid gap-4">
            {/* honeypot invisible */}
            <input name="hp" value={hp} onChange={(e)=>setHp(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />

            <input
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="Nombre completo"
              required
              className="w-full rounded-xl px-4 py-3 bg-[rgba(12,22,48,.85)] border border-[rgba(127,231,255,.35)] text-white"
            />
            <input
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
              className="w-full rounded-xl px-4 py-3 bg-[rgba(12,22,48,.85)] border border-[rgba(127,231,255,.35)] text-white"
            />
            <input
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              placeholder="Teléfono (opcional)"
              className="w-full rounded-xl px-4 py-3 bg-[rgba(12,22,48,.85)] border border-[rgba(127,231,255,.35)] text-white"
            />
            <textarea
              value={message}
              onChange={(e)=>setMessage(e.target.value)}
              placeholder="Mensaje"
              required
              rows={6}
              className="w-full rounded-xl px-4 py-3 bg-[rgba(12,22,48,.85)] border border-[rgba(127,231,255,.35)] text-white"
            />
            <button
              disabled={loading}
              className="rounded-full border px-5 py-3 font-semibold border-[rgba(127,231,255,.75)] bg-gradient-to-b from-[#7fe7ff] to-[#9ff0ff] text-[#0f2a5c]"
            >
              {loading? 'Enviando…':'Enviar'}
            </button>
          </form>
        </section>

        {/* Mapa */}
        <section className="rounded-2xl overflow-hidden outline-cyan card-dark p-0">
          <iframe
            title="Ubicación del consultorio"
            src={MAP}
            width="100%"
            height="420"
            style={{border:0}}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      </div>

      {/* reCAPTCHA v3 si hay clave pública */}
      {SITE_KEY && (
        <Script src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`} strategy="afterInteractive" />
      )}
    </div>
  );
}
