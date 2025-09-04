'use client'

import Image from 'next/image'
import Link from 'next/link'
import Reveal from '../../components/Reveal'

export default function SobreNosotrosPage(){
  return (
    <div className="min-h-screen text-white">
      {/* HERO */}
      <section className="pt-16 pb-10 relative">
        <div className="h-line" />
        <div className="mx-auto max-w-6xl px-4 text-center">
          <Reveal>
            <h1 className="tracking-wide" style={{fontSize:'clamp(2.2rem,6vw,4.2rem)'}}>
              ¿CÓMO ESTAMOS TAN SEGUROS DE
            </h1>
          </Reveal>
          <Reveal>
            <h2 className="font-bold italic" style={{fontSize:'clamp(2.4rem,7vw,5rem)'}}>CUMPLIR LO QUE PROMETEMOS?</h2>
          </Reveal>
          <Reveal>
            <p className="mt-6 text-muted">Aquí está la prueba:</p>
          </Reveal>
          <Reveal>
            <div className="mt-6 flex justify-center">
              <Link href="/programas" className="pill">NUESTROS PROGRAMAS</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BLOQUE DOBLE CON CAJAS */}
      <section className="py-14 relative">
        <div className="h-line" />
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="outline-cyan card-dark">
              <p className="lead">Si salís a buscar opciones, vas a encontrar cientos de promesas de “cambios definitivos”.</p>
              <p className="mt-4"><span className="hl">Nosotros trabajamos con evidencia</span>, hábitos simples y seguimiento real para que eso pase en tu vida.</p>
              <p className="mt-4">No somos humo ni fórmulas mágicas: <span className="hl">somos proceso</span>, claridad y constancia.</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="outline-cyan card-dark">
              <p className="lead">Tenemos algo muy claro: <span className="hl">queremos que seas vos quien tome sus propias decisiones</span>.</p>
              <p className="mt-4">Porque cada día tomás miles de decisiones. Que las tuyas te acerquen a tu objetivo: <span className="hl">salud, energía y rendimiento</span>.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PREGUNTA GRANDE */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <Reveal>
            <h2 className="question">¿Cuántas decisiones en tu alimentación tomás por costumbre o inercia?</h2>
          </Reveal>
          <Reveal>
            <div className="mx-auto max-w-4xl mt-10 outline-cyan card-dark">
              <p>Te sorprendería saber cuántas veces elegimos sin darnos cuenta. En Nutrición, <span className="hl">las pequeñas decisiones repetidas</span> cambian un cuerpo, una mente y un día entero.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CLAIM */}
      <section className="py-12 text-center">
        <div className="mx-auto max-w-5xl px-4">
          <Reveal>
            <div className="claim-top">Lo tenemos claro:</div>
          </Reveal>
          <Reveal>
            <div className="claim-main">vamos a redefinir tu salud</div>
          </Reveal>
          <Reveal>
            <p className="mt-4 italic text-muted">El mundo actual no espera a nadie: preparar tu energía, descanso y nutrición es prepararte para la vida.</p>
          </Reveal>
        </div>
      </section>

      {/* TEXTO + IMAGEN EN FADE */}
      <section className="py-16 relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-start">
          <Reveal>
            <div>
              <p className="lead">Nuestra visión es simple:</p>
              <p className="mt-2 lead"><span className="hl">Prepararte para que sigas el ritmo</span> y para que seas vos quien lo marque.</p>
              <p className="mt-6">No importa el punto de partida. Estamos para redefinir lo que significa <b>estar bien</b> en tu día a día: comer mejor, moverte mejor, dormir mejor.</p>
              <p className="mt-6"><b>Vamos más allá de las promesas</b>: este es el espacio donde vas a transformar tu enfoque y tus resultados.</p>
              <p className="mt-6">Queremos que dejes de sentirte estancado y que <span className="hl">cada esfuerzo valga la pena</span>.</p>
            </div>
          </Reveal>
          <div className="relative min-h-[420px]">
            {/* Imagen en fade. Colocá tus imágenes en /public/images/ y actualizá src. */}
            <div className="fade-img"></div>
            <Image src="/images/sobre-hero.jpg" alt="Nutrición y rendimiento" fill className="object-cover opacity-25 md:opacity-30" priority sizes="(max-width:768px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <Reveal>
          <div className="mx-auto max-w-4xl px-4 outline-cyan card-dark">
            <h3 className="uppercase tracking-wide text-2xl">¿Listo para empezar?</h3>
            <p className="mt-3">Agendá una consulta: definimos objetivos, armamos tu plan y empezamos.</p>
            <div className="mt-6"><Link href="/agendar" className="pill">Agendar ahora</Link></div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}