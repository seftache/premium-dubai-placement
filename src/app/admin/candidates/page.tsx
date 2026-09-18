"use client";

import { useState, useEffect } from "react";
import type { Candidate } from "@/lib/types";

export default function AdminCandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetch("/api/admin/candidates")
      .then((r) => r.json())
      .then((data) => {
        if (data.candidates) setCandidates(data.candidates);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = candidates.filter((c) => {
    const q = searchTerm.toLowerCase();
    return (
      c.ref_code.toLowerCase().includes(q) ||
      c.full_name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.expertise.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Toutes les Candidatures
          </h1>
          <p className="text-xs text-zinc-400 font-sans mt-1">
            Supervision et contrôle de conformité des profils enregistrés sur la plateforme.
          </p>
        </div>

        <div className="max-w-xs w-full">
          <input
            type="text"
            placeholder="Rechercher nom, ref, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs outline-none focus:border-red-500"
          />
        </div>
      </div>

      {/* ── Candidates Table ── */}
      <div className="p-6 rounded-3xl bg-zinc-900/30 border border-white/5">
        {loading ? (
          <div className="py-8 text-center text-xs text-zinc-400">Chargement des candidatures...</div>
        ) : filtered.length === 0 ? (
          <div className="py-8 text-center text-xs text-zinc-400">Aucune candidature trouvée.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                  <th className="pb-3">Réf.</th>
                  <th className="pb-3">Candidat</th>
                  <th className="pb-3">Contact</th>
                  <th className="pb-3">Domaine</th>
                  <th className="pb-3">Passeport</th>
                  <th className="pb-3">Statut</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3 text-right">Consentement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 font-mono font-bold text-brand-gold">{c.ref_code}</td>
                    <td className="py-4 font-semibold text-white">{c.full_name}</td>
                    <td className="py-4 text-zinc-400">
                      <div>{c.email}</div>
                      <div className="font-mono text-[11px] text-zinc-400">{c.phone}</div>
                    </td>
                    <td className="py-4 text-zinc-200 capitalize">{c.expertise.replace("-", " ")}</td>
                    <td className="py-4">
                      {c.passport_status === "oui" ? (
                        <span className="text-emerald-400">Valide</span>
                      ) : (
                        <span className="text-amber-400">Renouvellement</span>
                      )}
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          c.status === "UNLOCKED"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {c.status === "UNLOCKED" ? "Débloqué" : "En attente"}
                      </span>
                    </td>
                    <td className="py-4 text-zinc-400 font-mono">
                      {new Date(c.created_at).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="py-4 text-right">
                      <span className="text-[10px] text-emerald-400 font-mono">
                        {c.consent_given ? "✓ RGPD Acquis" : "Non"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
