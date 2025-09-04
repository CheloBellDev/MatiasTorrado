"use client";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
const AuthMenu = dynamic(() => import("./AuthMenu"), { ssr: false });


export default function NavBar(){
const [open, setOpen] = useState(false);
return (
<header className="nav">
<nav className="container flex items-center justify-between py-4 text-white">
<Link href="/" className="font-bold uppercase tracking-wide text-[20px] md:text-[22px]">Matias Torrado Nutricion</Link>
{/* Desktop */}
<ul className="hidden md:flex items-center gap-6 text-[16px] md:text-[17px]">
<li><Link href="/" className="hover:underline">Inicio</Link></li>
<li><Link href="/programas" className="hover:underline">Programas</Link></li>
<li><Link href="/agendar" className="hover:underline">Agendar</Link></li>
<li><Link href="/contacto" className="hover:underline">Contacto</Link></li>
<li><Link href="/sobre-nosotros" className="hover:underline">Sobre nosotros</Link></li>
<AuthMenu />
</ul>
{/* Mobile burger */}
<button aria-label="Abrir menú" className="md:hidden border rounded-full px-3 py-1" onClick={()=>setOpen(true)}>☰</button>
</nav>


{/* Mobile overlay */}
{open && (
<div className="mobile-overlay" role="dialog" aria-modal="true">
<div className="mobile-panel">
<button aria-label="Cerrar menú" className="mobile-close" onClick={()=>setOpen(false)}>✕</button>
<ul className="grid gap-4 text-lg">
<li><Link onClick={()=>setOpen(false)} href="/">Inicio</Link></li>
<li><Link onClick={()=>setOpen(false)} href="/programas">Programas</Link></li>
<li><Link onClick={()=>setOpen(false)} href="/agendar">Agendar</Link></li>
<li><Link onClick={()=>setOpen(false)} href="/contacto">Contacto</Link></li>
<li><Link onClick={()=>setOpen(false)} href="/sobre-nosotros">Sobre nosotros</Link></li>
<li>
<Link
onClick={()=>setOpen(false)}
href="/login"
className="inline-block leading-none px-5 py-2.5 rounded-full border border-white/70 hover:bg-white/10"
>
Iniciar sesión
</Link>
</li>
</ul>
</div>
</div>
)}
</header>
);
}