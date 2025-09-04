"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveTokens } from "../../lib/auth";
import { emitAuthChanged } from "../../lib/auth-events";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) { setError(res.status === 401 ? "Usuario o contraseña incorrectos" : `Error ${res.status}`); return; }
      const data = await res.json();
      saveTokens({ access: data.access, refresh: data.refresh });
      emitAuthChanged();
      router.push("/account");
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#143464] text-white">
      <div className="bg-[#183464] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Iniciar sesión</h1>
        {error && <p className="text-red-300 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Usuario o email" value={username}
                 onChange={(e)=>setUsername(e.target.value)}
                 className="w-full px-4 py-3 rounded-xl bg-[#10294f] border border-gray-500 focus:outline-none" required />
          <input type="password" placeholder="Contraseña" value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                 className="w-full px-4 py-3 rounded-xl bg-[#10294f] border border-gray-500 focus:outline-none" required />
          <button type="submit" disabled={loading}
                  className="w-full bg-[#1e4aa4] hover:bg-[#2860d8] disabled:opacity-60 text-white py-3 rounded-xl font-semibold transition">
            {loading ? "Accediendo…" : "Acceder"}
          </button>
        </form>
      </div>
    </div>
  );
}
