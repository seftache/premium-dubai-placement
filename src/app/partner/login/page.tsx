"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PartnerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("contact@gulfrecruitment.ae");
  const [password, setPassword] = useState<string>("••••••••");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Authenticate and redirect to dashboard
    setTimeout(() => {
      router.push("/partner/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Glow ambient */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] rounded-full z-0"
        style={{
          background: "radial-gradient(circle, rgba(201, 169, 110, 0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="w-full max-w-md rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl p-8 sm:p-10 shadow-[0_0_80px_rgba(0,0,0,0.8)] relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="font-serif text-xl font-bold tracking-tight text-white inline-block">
            EMPLOIS DUBAÏ
          </Link>
          <div className="inline-block px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-[10px] font-sans font-bold tracking-widest text-brand-gold uppercase">
            Portail Agences Partenaires
          </div>
          <h2 className="font-serif text-2xl font-bold text-white pt-2">Accès Espace Partenaire</h2>
          <p className="text-xs text-zinc-400 font-light">
            Connectez-vous pour consulter vos candidatures et gérer votre solde.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] uppercase font-bold tracking-wider text-zinc-400">
              Email Professionnel
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs outline-none focus:border-brand-gold transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase font-bold tracking-wider text-zinc-400">
              Mot de passe
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs outline-none focus:border-brand-gold transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-brand-gold hover:bg-brand-gold-light text-black font-sans text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(201,169,110,0.3)] cursor-pointer mt-4"
          >
            {loading ? "Connexion..." : "Se Connecter à l'Espace"}
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
