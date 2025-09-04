'use client';
import { useEffect, useRef } from 'react';

export default function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }){
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ el.classList.add('visible'); io.unobserve(el); }});
    },{threshold:.18});
    el && io.observe(el);
    return ()=> io.disconnect();
  },[]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}