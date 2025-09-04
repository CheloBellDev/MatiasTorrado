"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["SALUDABLE", "ENERGÉTICA", "SOSTENIBLE", "REAL"];

export default function Hero() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-20">
      <div className="text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold uppercase"
        >
          TRANSFORMÁ TU VIDA <span className="block">NUTRICIONAL</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl max-w-3xl mx-auto"
        >
          Programas personalizados para una vida{" "}
          <span className="underline decoration-2 underline-offset-4">{words[index]}</span>.
        </motion.p>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          <a href="/agendar" className="px-6 py-3 border rounded-full hover:shadow">Agendar</a>
          <a href="/programas" className="px-6 py-3 border rounded-full hover:shadow">Ver Programas</a>
        </motion.div>
      </div>
    </section>
  );
}
