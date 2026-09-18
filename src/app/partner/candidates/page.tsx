"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Candidate {
  id: string;
  ref_code: string;
  expertise: string;
  passport_status: string;
  status: string;
  created_at: string;
  full_name?: string;
  email?: string;
  phone?: string;
  motivation?: string;
  unlocked_at?: string;
}

export default function PartnerCandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [candidatePrice, setCandidatePrice] = useState<number>(10);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<"ALL" | "AVAILABLE" | "UNLOCKED">("ALL");

  // Modal unlock state
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isUnlocking, setIsUnlocking] = useState<boolean>(false);
  const [unlockMessage, setUnlockMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchCandidates = () => {
    setLoading(true);
    fetch("/api/partner/candidates")
      .then((r) => r.json())
      .then((data) => {
        if (data.candidates) setCandidates(data.candidates);
        if (data.candidatePrice !== undefined) setCandidatePrice(data.candidatePrice);
        if (data.agency?.balance_usd !== undefined) setBalance(data.agency.balance_usd);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleUnlock = async (candidateId: string) => {
    setIsUnlocking(true);
    setUnlockMessage(null);

    try {
      const res = await fetch(`/api/partner/candidates/${candidateId}/unlock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setUnlockMessage({
          type: "error",
          text: data.error || "Impossible de débloquer le candidat.",
        });
        return;
      }

      setUnlockMessage({
        type: "success",
        text: `Profil #${data.candidate?.ref_code || ""} débloqué ! Vos coordonnées et détails sont désormais accessibles.`,
      });

      // Refresh list & balance
      fetchCandidates();
      setTimeout(() => {
        setSelectedCandidate(null);
        setUnlockMessage(null);
      }, 1800);
    } catch {
      setUnlockMessage({
        type: "error",
        text: "Erreur réseau lors de la transaction.",
      });
    } finally {
      setIsUnlocking(false);
    }
  };

  const filteredCandidates = candidates.filter((c) => {
    if (filter === "AVAILABLE") return c.status !== "UNLOCKED";
    if (filter === "UNLOCKED") return c.status === "UNLOCKED";
    return true;
  });

  return (
    <div className="space-y-8">
      {/* ── Top Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Gestion des Candidats
          </h1>
          <p className="text-xs text-zinc-400 font-sans mt-1">
            Visualisez les profils qualifiés et débloquez les coordonnées selon votre besoin.
          </p>
        </div>

        {/* Balance Badge */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-zinc-900 border border-white/10 flex items-center gap-2.5">
            <span className="text-[10px] uppercase tracking-wider text-zinc-400">Solde :</span>
            <span className="font-mono text-sm font-bold text-brand-gold">${balance.toFixed(2)} USD</span>
          </div>
          <Link
            href="/partner/balance"
            className="px-4 py-2 rounded-2xl bg-brand-gold text-black font-sans text-xs font-bold hover:bg-brand-gold-light transition-all"
          >
            + Recharger
          </Link>
        </div>
      </div>

      {/* ── Filter Tabs ── */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        <button
          onClick={() => setFilter("ALL")}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
            filter === "ALL"
              ? "bg-white/10 text-white font-semibold"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Tous ({candidates.length})
        </button>
        <button
          onClick={() => setFilter("AVAILABLE")}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
            filter === "AVAILABLE"
              ? "bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          À Débloquer (${candidatePrice}) ({candidates.filter((c) => c.status !== "UNLOCKED").length})
        </button>
        <button
          onClick={() => setFilter("UNLOCKED")}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
            filter === "UNLOCKED"
              ? "bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Débloqués ({candidates.filter((c) => c.status === "UNLOCKED").length})
        </button>
      </div>

      {/* ── Candidate Cards Grid ── */}
      {loading ? (
        <div className="py-16 text-center text-xs text-zinc-400">Chargement des profils...</div>
      ) : filteredCandidates.length === 0 ? (
        <div className="py-16 text-center text-xs text-zinc-400">
          Aucun candidat ne correspond à ce filtre pour le moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCandidates.map((cand) => {
            const isUnlocked = cand.status === "UNLOCKED";

            return (
              <div
                key={cand.id}
                className={`p-6 rounded-3xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                  isUnlocked
                    ? "bg-zinc-900/50 border-emerald-500/20 hover:border-emerald-500/40"
                    : "bg-zinc-900/30 border-white/5 hover:border-amber-500/30"
                }`}
              >
                {/* Header Card */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="font-mono text-xs font-bold text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20">
                      #{cand.ref_code}
                    </span>
                    {isUnlocked ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Coordonnées Débloquées
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        🔒 Infos Masquées
                      </span>
                    )}
                  </div>

                  {/* Profile General Data */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">Domaine :</span>
                      <span className="font-semibold text-white capitalize">{cand.expertise.replace("-", " ")}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">Statut Passeport :</span>
                      <span className="text-white">
                        {cand.passport_status === "oui" ? "✅ Passeport valide" : "⏳ En cours de renouvellement"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">Date de dépôt :</span>
                      <span className="text-zinc-400">{new Date(cand.created_at).toLocaleDateString("fr-FR")}</span>
                    </div>
                  </div>

                  {/* UNLOCKED DETAILS (Name, Email, Phone, WhatsApp) */}
                  {isUnlocked ? (
                    <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-3 mb-6">
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                          Candidat
                        </p>
                        <p className="text-sm font-bold text-white mt-0.5">{cand.full_name}</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-white/5">
                        <div>
                          <span className="text-[10px] text-zinc-400 block">Email :</span>
                          <a href={`mailto:${cand.email}`} className="text-brand-gold hover:underline truncate block">
                            {cand.email}
                          </a>
                        </div>
                        <div>
                          <span className="text-[10px] text-zinc-400 block">Téléphone / WhatsApp :</span>
                          <a href={`tel:${cand.phone}`} className="text-white hover:underline block font-mono">
                            {cand.phone}
                          </a>
                        </div>
                      </div>
                      {cand.motivation && (
                        <div className="pt-2 border-t border-white/5 text-xs text-zinc-300 font-light">
                          <span className="text-[10px] text-zinc-400 block uppercase">Motivation :</span>
                          {cand.motivation}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* MASKED DETAILS TEASER */
                    <div className="p-4 rounded-2xl bg-black/20 border border-white/5 text-center mb-6">
                      <p className="text-xs text-zinc-400">
                        Nom, coordonnées email, numéro WhatsApp et historique complet protégés.
                      </p>
                      <p className="text-[11px] text-brand-gold font-medium mt-1">
                        Price per qualified candidate: ${candidatePrice} USD
                      </p>
                    </div>
                  )}
                </div>

                {/* Card Action Button */}
                <div>
                  {isUnlocked ? (
                    <div className="flex items-center gap-3">
                      <a
                        href={`https://wa.me/${cand.phone?.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs font-bold text-center transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                      >
                        Contacter sur WhatsApp
                      </a>
                      <a
                        href={`mailto:${cand.email}`}
                        className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-all"
                      >
                        Email
                      </a>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedCandidate(cand)}
                      className="w-full py-3 rounded-2xl bg-brand-gold hover:bg-brand-gold-light text-black font-sans text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(201,169,110,0.3)] cursor-pointer"
                    >
                      DÉBLOQUER CE PROFIL (${candidatePrice} USD)
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── UNLOCK CONFIRMATION MODAL ── */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-zinc-950 border border-brand-gold/30 p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20">
                  #{selectedCandidate.ref_code}
                </span>
                <button
                  onClick={() => {
                    setSelectedCandidate(null);
                    setUnlockMessage(null);
                  }}
                  className="text-zinc-400 hover:text-white text-sm"
                >
                  ✕
                </button>
              </div>
              <h3 className="font-serif text-xl font-bold text-white mt-4">
                Confirmer le déblocage du profil
              </h3>
              <p className="text-xs text-zinc-400 mt-1 font-light">
                Domaine : <span className="capitalize text-white font-medium">{selectedCandidate.expertise.replace("-", " ")}</span>
              </p>
            </div>

            {/* Financial summary */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Prix du candidat :</span>
                <span className="font-bold text-brand-gold">${candidatePrice.toFixed(2)} USD</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Votre Solde Partenaire actuel :</span>
                <span className="font-bold text-white">${balance.toFixed(2)} USD</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/5 font-semibold">
                <span className="text-white">Solde après déblocage :</span>
                <span className={balance >= candidatePrice ? "text-emerald-400 font-mono" : "text-amber-500 font-mono"}>
                  ${Math.max(0, balance - candidatePrice).toFixed(2)} USD
                </span>
              </div>
            </div>

            {/* Alert / Notice */}
            {unlockMessage ? (
              <div
                className={`p-3 rounded-xl text-xs ${
                  unlockMessage.type === "success"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                }`}
              >
                {unlockMessage.text}
              </div>
            ) : balance < candidatePrice ? (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs">
                ⚠️ Solde insuffisant pour cette opération. Veuillez recharger votre solde via PayPal.
              </div>
            ) : (
              <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                Le montant sera automatiquement déduit de votre solde. Ce candidat ne vous sera jamais refacturé une seconde fois.
              </p>
            )}

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedCandidate(null);
                  setUnlockMessage(null);
                }}
                disabled={isUnlocking}
                className="flex-1 py-3 rounded-xl border border-white/10 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                Annuler
              </button>

              {balance < candidatePrice ? (
                <Link
                  href="/partner/balance"
                  className="flex-1 py-3 rounded-xl bg-brand-gold text-black font-sans text-xs font-bold text-center uppercase tracking-wider hover:bg-brand-gold-light transition-all"
                >
                  Ajouter du Solde →
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => handleUnlock(selectedCandidate.id)}
                  disabled={isUnlocking}
                  className="flex-1 py-3 rounded-xl bg-brand-gold hover:bg-brand-gold-light text-black font-sans text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(201,169,110,0.3)] disabled:opacity-50"
                >
                  {isUnlocking ? "Déblocage en cours..." : "Confirmer ($10 USD)"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
