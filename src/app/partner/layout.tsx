"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [balance, setBalance] = useState<number>(120);
  const [agencyName, setAgencyName] = useState<string>("Gulf Luxury Staffing");

  useEffect(() => {
    // Fetch live balance
    fetch("/api/partner/balance")
      .then((r) => r.json())
      .then((data) => {
        if (data.balance_usd !== undefined) setBalance(data.balance_usd);
        if (data.company_name) setAgencyName(data.company_name);
      })
      .catch(() => {});
  }, [pathname]);

  // If on login page, don't show full dashboard shell
  if (pathname === "/partner/login") {
    return <>{children}</>;
  }

  const navLinks = [
    { href: "/partner/dashboard", label: "Vue d'ensemble", icon: "📊" },
    { href: "/partner/candidates", label: "Candidats", icon: "👥" },
    { href: "/partner/balance", label: "Solde & Paiements", icon: "💳" },
    { href: "/partner/contracts", label: "Contrat Électronique", icon: "📜" },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col md:flex-row">
      {/* ── Sidebar ── */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-black/60 backdrop-blur-xl p-6 flex flex-col justify-between">
        <div>
          {/* Logo & Portal Badge */}
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-serif text-lg font-bold tracking-tight text-white group-hover:text-brand-gold transition-colors">
                EMPLOIS DUBAÏ
              </span>
            </Link>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-[10px] font-sans font-bold tracking-widest text-brand-gold uppercase">
                Espace Partenaire
              </span>
            </div>
          </div>

          {/* Agency Badge */}
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 mb-6">
            <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-sans">Agence connectée</p>
            <p className="text-xs font-semibold text-white truncate mt-0.5">{agencyName}</p>
            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-zinc-400">Solde disponible</span>
              <span className="font-mono text-sm font-bold text-brand-gold">${balance.toFixed(2)} USD</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-brand-gold text-black font-semibold shadow-[0_0_20px_rgba(201,169,110,0.3)]"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <span className="text-sm">{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info & Logout */}
        <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
          <div className="text-[10px] text-zinc-400 leading-snug">
            Tarif standard : <span className="text-brand-gold font-semibold">$10 USD</span> par candidat qualifié.
          </div>
          <Link
            href="/"
            className="block text-center w-full py-2 rounded-xl text-[11px] text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
          >
            ← Retour au site public
          </Link>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
