"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState<string>("••••••••");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="w-full max-w-md rounded-3xl bg-zinc-950 border border-red-500/30 p-8 sm:p-10 shadow-[0_0_80px_rgba(239,68,68,0.15)] relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="font-serif text-xl font-bold tracking-tight text-white inline-block">
            EMPLOIS DUBAÏ
          </Link>
          <div className="inline-block px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-[10px] font-sans font-bold tracking-widest text-red-400 uppercase">
            Administration Centrale
          </div>
          <h2 className="font-serif text-2xl font-bold text-white pt-2">Connexion Admin</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] uppercase font-bold tracking-wider text-zinc-400">
              Identifiant Super-Admin
            </label>
            <input
              type="text"
              defaultValue="admin@emploisdubai.com"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs outline-none focus:border-red-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase font-bold tracking-wider text-zinc-400">
              Clé d&apos;accès sécurisée
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs outline-none focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-sans text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] cursor-pointer mt-4"
          >
            {loading ? "Vérification..." : "Ouvrir la Console Admin"}
          </button>
        </form>

        <div className="pt-4 border-t border-white/5 text-center">
          <Link href="/" className="text-xs text-zinc-400 hover:text-white transition-colors">
            ← Revenir au site public
          </Link>
        </div>
      </div>
    </div>
  );
}
