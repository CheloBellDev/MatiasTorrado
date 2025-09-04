import Reveal from "../../components/Reveal";
import Link from "next/link";

type Plan = { id:number; title:string; description:string; price:string };

export const metadata = { title: 'Programas | Matias Torrado Nutricion' };

export default async function ProgramasPage(){
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  let items: Plan[] = [];
  try {
    const res = await fetch(`${base}/api/plans/`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      items = data.results ?? data ?? [];
    }
  } catch {}

  return (
    <div className="mx-auto max-w-6xl px-4">
      <section className="pt-16">
        <Reveal><h1 className="h-title">¿CÓMO ESTAMOS TAN SEGUROS DE</h1></Reveal>
        <Reveal><h2 className="h-sub accent-underline">MEJORAR TU SALUD Y TU ENERGÍA?</h2></Reveal>
        <Reveal><p className="text-muted max-w-3xl mt-4">Programas prácticos para hábitos sostenibles.</p></Reveal>
        <div className="mt-6 flex gap-3 flex-wrap">
          <Link href="#lista" className="btn btn-cta">Ver Programas</Link>
          <Link href="/agendar" className="btn btn-ghost">Agendar consulta</Link>
        </div>
      </section>

      <section id="lista" className="py-8">
        <Reveal><h2 className="h-sub mb-8">Elegí tu punto de partida</h2></Reveal>
        {items.length === 0 ? (
          <p className="text-muted">Sin programas cargados. Ejecutá <code>python manage.py seed_demo</code> en el backend.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {items.map(p => (
              <article key={p.id} className="card">
                <div className="badge mb-3">Programa</div>
                <h3 className="uppercase tracking-wide text-2xl mb-2">{p.title}</h3>
                <p className="mb-4 text-[16px] leading-7" style={{color:'#415a86'}}>{p.description}</p>
                <p className="text-[18px] font-bold">$ {p.price}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}