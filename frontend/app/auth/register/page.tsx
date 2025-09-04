"use client";
import { useRouter } from "next/navigation";
import { api } from "../../../lib/api";

export default function RegisterPage() {
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await api("/api/auth/register/", {
      method: "POST",
      body: JSON.stringify({
        username: fd.get("username"),
        email: fd.get("email"),
        password: fd.get("password"),
      }),
    });
    router.push("/auth/login");
  }

  return (
    <div className="py-12 max-w-md">
      <h1 className="text-4xl font-bold uppercase mb-6">Registrarse</h1>
      <form onSubmit={onSubmit} className="grid gap-4">
        <input name="username" required placeholder="Usuario" className="border p-3 rounded" />
        <input name="email" type="email" required placeholder="Email" className="border p-3 rounded" />
        <input name="password" type="password" required placeholder="Contraseña" className="border p-3 rounded" />
        <button className="px-6 py-3 border rounded-full hover:shadow">Crear cuenta</button>
      </form>
    </div>
  );
}
