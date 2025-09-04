"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { emitAuthChanged, onAuthChanged } from "../lib/auth-events";


function hasToken(){
try { return !!localStorage.getItem("access"); } catch { return false; }
}


export default function AuthMenu(){
const [logged, setLogged] = useState(false);
const router = useRouter();


useEffect(() => {
setLogged(hasToken());
const unsub = onAuthChanged(() => setLogged(hasToken()));
const onStorage = (e: StorageEvent) => { if (e.key === "access") setLogged(hasToken()); };
window.addEventListener("storage", onStorage);
return () => { window.removeEventListener("storage", onStorage); unsub(); };
}, []);


function logout(){
try{
localStorage.removeItem("access");
localStorage.removeItem("refresh");
} finally {
emitAuthChanged();
router.push("/login");
}
}


return (
<>
{logged ? (
<>
<li><Link href="/account" className="hover:underline">Mi cuenta</Link></li>
<li>
<button onClick={logout} className="px-3 py-1 border rounded-full hover:bg-white/10">Salir</button>
</li>
</>
) : (
<li>
<Link
href="/login"
className="inline-block leading-none px-5 py-2.5 rounded-full border border-white/70 hover:bg-white/10 transition-[background,transform] duration-200"
>
Iniciar sesión
</Link>
</li>
)}
</>
);
}