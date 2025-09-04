"use client";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

type Availability = { date: string; slots: string[] };

export default function AgendarPage() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [date, setDate] = useState<string>("");
  const [slots, setSlots] = useState<string[]>([]);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    async function load() {
      if (!date) return;
      try {
        const data = await api<Availability>(`/api/appointments/availability/?date=${date}`);
        setSlots(data.slots);
        setTime("");
      } catch (e: any) {
        setSlots([]);
      }
    }
    load();
  }, [date]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    const fd = new FormData(e.currentTarget);
    const dt = time || `${fd.get("date")}T${fd.get("time")}:00-03:00`;
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      start_datetime: time ? time : new Date(dt as string).toISOString(),
      notes: fd.get("notes"),
    } as any;
    try {
      const data = await api<any>("/api/appointments/", { method: "POST", body: JSON.stringify(payload) });
      setMsg(data?.calendar?.id ? "Cita confirmada y calendarizada." : "Cita registrada. Te confirmamos por mail.");
      (e.target as HTMLFormElement).reset();
      setDate("");
      setSlots([]);
      setTime("");
    } catch (err: any) {
      setMsg(err.message || "Error al agendar");
    } finally {
      setLoading(false);
    }
  }

  const inputCls = "border border-[rgba(20,52,100,.25)] rounded-2xl p-4 bg-white text-[16px] leading-6 text-[#143464] placeholder-[#6c86b8]";

  return (
    <div className="py-12 max-w-2xl">
      <h1 className="h-sub mb-6">Agendar</h1>
      <form onSubmit={onSubmit} className="grid gap-4">
        <input name="name" required placeholder="Nombre completo" className={inputCls} />
        <input name="email" required type="email" placeholder="Email" className={inputCls} />
        <input name="phone" required placeholder="Teléfono" className={inputCls} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="date" required type="date" value={date} onChange={(e)=>setDate(e.target.value)} className={inputCls} />
          {slots.length > 0 ? (
            <select value={time} onChange={(e)=>setTime(e.target.value)} className={inputCls}>
              <option value="">Elegí un horario</option>
              {slots.map((s) => {
                const d = new Date(s);
                const hh = String(d.getHours()).padStart(2, "0");
                const mm = String(d.getMinutes()).padStart(2, "0");
                return <option key={s} value={s}>{hh}:{mm}</option>;
              })}
            </select>
          ) : (
            <input name="time" required type="time" className={inputCls} />
          )}
        </div>
        <textarea name="notes" placeholder="Notas" className={inputCls + " min-h-[120px]"} />
        <button disabled={loading} className="px-6 py-3 border rounded-full hover:shadow disabled:opacity-50">
          {loading ? "Agendando…" : "Confirmar"}
        </button>
        {msg && <p className="text-sm" style={{color:'rgba(255,255,255,.9)'}}>{msg}</p>}
      </form>
      <p className="mt-6 text-sm" style={{color:'rgba(255,255,255,.8)'}}>* Zona horaria: America/Montevideo</p>
    </div>
  );
}
