'use client'
import { useState, useRef } from 'react'

type Props = {
  src: string
  className?: string
  height?: number | string
}

export default function MouseReveal({ src, className = '', height = '100%' }: Props) {
  const [pos, setPos] = useState<{x:number;y:number}|null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  function onLeave(){ setPos(null) }

  const mask = pos
    ? `radial-gradient(180px at ${pos.x}px ${pos.y}px, rgba(0,0,0,0) 0 170px, rgba(0,0,0,1) 200px)`
    : 'radial-gradient(180px at -200px -200px, rgba(0,0,0,0) 0 170px, rgba(0,0,0,1) 200px)'

  return (
    <div ref={wrapRef} onMouseMove={onMove} onMouseLeave={onLeave}
         className={`relative overflow-hidden rounded-2xl ${className}`} style={{height}}>
      <div className="absolute inset-0" style={{
        backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center', filter:'saturate(1.05)'
      }}/>
      {/* Overlay oscuro con máscara que sigue al mouse */}
      <div className="absolute inset-0 bg-[rgba(4,10,30,.90)]"
           style={{ WebkitMaskImage: mask as any, maskImage: mask as any }} />
      {/* Glow cian sutil */}
      <div className="pointer-events-none absolute -inset-10 opacity-40"
           style={{background:'radial-gradient(35% 35% at 70% 30%, rgba(127,231,255,.25), transparent 60%)'}}/>
    </div>
  )
}