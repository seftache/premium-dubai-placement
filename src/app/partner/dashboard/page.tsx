"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CandidateItem {
  id: string;
  ref_code: string;
  expertise: string;
  passport_status: string;
  status: string;
  created_at: string;
  full_name?: string;
  email?: string;
  phone?: string;
}

export default function PartnerDashboard() {
  const [balance, setBalance] = useState<number>(120);
  const [candidatePrice, setCandidatePrice] = useState<number>(10);
  const [candidates, setCandidates] = useState<CandidateItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/partner/candidates")
      .then((r) => r.json())
      .then((data) => {
        if (data.agency?.balance_usd !== undefined) setBalance(data.agency.balance_usd);
        if (data.candidatePrice !== undefined) setCandidatePrice(data.candidatePrice);
        if (data.candidates) setCandidates(data.candidates);
      })
      .finally(() => setLoading(false));
  }, []);

  const unlockedCount = candidates.filter((c) => c.status === "UNLOCKED").length;
  const availableCount = candidates.filter((c) => c.status !== "UNLOCKED").length;

  return (
    <div className="space-y-8">
      {/* ── Top Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Tableau de Bord Partenaire
          </h1>
          <p className="text-xs text-zinc-400 font-sans mt-1">
            Gérez vos flux de candidatures qualifiées et votre solde prépayé.
          </p>
        </div>
        <Link
          href="/partner/balance"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-brand-gold text-black font-sans text-xs font-bold tracking-wider uppercase hover:bg-brand-gold-light transition-all shadow-[0_0_25px_rgba(201,169,110,0.35)]"
        >
          <span>💳</span> Ajouter du solde
        </Link>
      </div>

      {/* ── Pricing Policy Callout ── */}
      <div className="p-4 rounded-2xl bg-brand-gold/[0.04] border border-brand-gold/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold text-sm font-bold">
            ℹ
          </div>
          <div>
            <p className="text-xs font-semibold text-white">
              Modèle à la Transmission Qualifiée
            </p>
            <p className="text-[11px] text-zinc-400">
              Price per qualified candidate: <span className="text-brand-gold font-bold">${candidatePrice} USD</span>. Déduction automatique au déblocage.
            </p>
          </div>
        </div>
        <div className="text-[11px] text-zinc-400">
          Capacité restante : <span className="font-bold text-white">{Math.floor(balance / candidatePrice)} candidat(s)</span>
        </div>
      </div>

      {/* ── Key Metrics Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Solde Partenaire */}
        <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm relative overflow-hidden flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-zinc-400">
              Solde Partenaire
            </p>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-brand-gold mt-2">
              ${balance.toFixed(2)} <span className="text-sm font-sans font-normal text-zinc-400">USD</span>
            </h3>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-[11px] text-zinc-400">Paiements via PayPal</span>
            <Link href="/partner/balance" className="text-[11px] text-brand-gold hover:underline">
              Recharger →
            </Link>
          </div>
        </div>

        {/* Candidats Disponibles */}
        <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm relative overflow-hidden flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-zinc-400">
              Candidats Disponibles
            </p>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">
              {availableCount}
            </h3>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-[11px] text-zinc-400">En attente de déblocage</span>
            <Link href="/partner/candidates" className="text-[11px] text-brand-gold hover:underline">
              Débloquer (${candidatePrice}) →
            </Link>
          </div>
        </div>

        {/* Candidats Débloqués */}
        <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm relative overflow-hidden flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-zinc-400">
              Candidats Débloqués
            </p>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">
              {unlockedCount}
            </h3>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-[11px] text-zinc-400">Coordonnées complètes</span>
            <Link href="/partner/candidates?filter=unlocked" className="text-[11px] text-brand-gold hover:underline">
              Consulter →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Recent Activity / Candidate Stream ── */}
      <div className="p-6 rounded-3xl bg-zinc-900/30 border border-white/5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-lg font-bold text-white">Flux Récent de Candidatures</h2>
          <Link href="/partner/candidates" className="text-xs text-brand-gold hover:underline">
            Voir tous les candidats ({candidates.length}) →
          </Link>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-zinc-400">Chargement des données...</div>
        ) : candidates.length === 0 ? (
          <div className="py-8 text-center text-xs text-zinc-400">
            Aucune candidature n&apos;est actuellement assignée à votre agence.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                  <th className="pb-3">Réf.</th>
                  <th className="pb-3">Domaine</th>
                  <th className="pb-3">Passeport</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Statut</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {candidates.slice(0, 5).map((cand) => (
                  <tr key={cand.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 font-mono font-semibold text-brand-gold">{cand.ref_code}</td>
                    <td className="py-3.5 text-zinc-200 capitalize">{cand.expertise.replace("-", " ")}</td>
                    <td className="py-3.5 text-zinc-400">
                      {cand.passport_status === "oui" ? "✅ Valide" : "⏳ En cours"}
                    </td>
                    <td className="py-3.5 text-zinc-400">
                      {new Date(cand.created_at).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="py-3.5">
                      {cand.status === "UNLOCKED" ? (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Débloqué
                        </span>
                      ) : (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          Masqué
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 text-right">
                      <Link
                        href="/partner/candidates"
                        className="text-xs text-brand-gold hover:text-white font-medium transition-colors"
                      >
                        {cand.status === "UNLOCKED" ? "Voir contact →" : "Débloquer ($10) →"}
                      </Link>
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
