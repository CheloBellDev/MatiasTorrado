"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="bg-[#143464] text-white min-h-screen">
      
      {/* HERO SECTION */}
      <section className="flex flex-col items-center text-center py-20 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl"
        >
          ¿CÓMO ESTAMOS TAN SEGUROS DE QUE PODEMOS{" "}
          <span className="italic">TRANSFORMAR TU SALUD Y RENDIMIENTO</span>?
        </motion.h1>
        <p className="mt-4 text-lg">Aquí está la prueba:</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-6 px-8 py-3 bg-transparent border border-white rounded-full font-bold text-lg"
        >
          NUESTROS PROGRAMAS
        </motion.button>
      </section>

      {/* CLUB DESTACADO */}
      <section className="bg-blue-500 py-12 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold">
          EL CLUB DE NUTRICIÓN Y RENDIMIENTO PERSONAL
        </h2>
        <p className="mt-4 max-w-2xl mx-auto">
          Diseñado para mejorar tu salud, potenciar tu energía y ayudarte a
          alcanzar tus objetivos físicos y mentales.
        </p>
      </section>

      {/* SECCIÓN EXPLICATIVA */}
      <section className="py-16 px-6 max-w-5xl mx-auto space-y-8 text-lg">
        <p>
          Mes a mes podrás mejorar tu salud y rendimiento. El club te permitirá
          adquirir los hábitos para potenciar tu energía y bienestar.
        </p>
        <p className="text-blue-300 font-semibold">
          Sin techo, el límite lo pones tú.
        </p>
        <p>
          Aquí aprenderás cómo alimentarte, entrenar y descansar de forma
          estratégica para que tu cuerpo y mente funcionen al máximo.
        </p>
      </section>

      {/* 6 ETAPAS */}
      <section className="py-16 bg-[#122c5c]">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          LAS 6 ETAPAS DE TU TRANSFORMACIÓN
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
          {[
            {
              title: "Evaluación Inicial",
              desc: "Analizamos tu estado actual y establecemos objetivos claros.",
            },
            {
              title: "Plan Personalizado",
              desc: "Diseñamos un plan de nutrición y entrenamiento adaptado a ti.",
            },
            {
              title: "Seguimiento",
              desc: "Controlamos tu progreso con ajustes semanales.",
            },
            {
              title: "Optimización",
              desc: "Mejoramos tu rendimiento y corregimos detalles clave.",
            },
            {
              title: "Rendimiento Máximo",
              desc: "Alcanzamos tu mejor versión física y mental.",
            },
            {
              title: "Mantenimiento",
              desc: "Sostenemos tus logros a largo plazo.",
            },
          ].map((etapa, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white text-[#143464] p-6 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              <h3 className="font-bold text-xl mb-2">{etapa.title}</h3>
              <p>{etapa.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  );
}