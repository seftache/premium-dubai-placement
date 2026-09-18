"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navLinks = [
    { href: "/admin/dashboard", label: "Dashboard Général", icon: "📈" },
    { href: "/admin/agencies", label: "Agences Partenaires", icon: "🏢" },
    { href: "/admin/candidates", label: "Candidats & Flux", icon: "👥" },
    { href: "/admin/transactions", label: "Finances & Transactions", icon: "💰" },
  ];

  return (
    <div className="min-h-screen bg-[#060606] text-white flex flex-col md:flex-row">
      {/* ── Admin Sidebar ── */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-red-500/20 bg-black/80 backdrop-blur-xl p-6 flex flex-col justify-between">
        <div>
          {/* Logo & Portal Badge */}
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-serif text-lg font-bold tracking-tight text-white group-hover:text-red-400 transition-colors">
                EMPLOIS DUBAÏ
              </span>
            </Link>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-sans font-bold tracking-widest text-red-400 uppercase">
                Console Super-Admin
              </span>
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
                      ? "bg-red-500/20 text-red-300 font-semibold border border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
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

        {/* Footer info & Portal Switch */}
        <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
          <Link
            href="/partner/dashboard"
            className="block text-center w-full py-2 rounded-xl text-[11px] text-brand-gold bg-brand-gold/10 hover:bg-brand-gold/20 transition-colors"
          >
            Vue Espace Partenaire →
          </Link>
          <Link
            href="/"
            className="block text-center w-full py-2 rounded-xl text-[11px] text-zinc-400 hover:text-white transition-colors"
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
