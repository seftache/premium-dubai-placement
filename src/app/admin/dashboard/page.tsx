"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Agency, Candidate } from "@/lib/types";

export default function AdminDashboardPage() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [priceUsd, setPriceUsd] = useState<number>(10);
  const [newPriceInput, setNewPriceInput] = useState<string>("10");
  const [priceSaving, setPriceSaving] = useState<boolean>(false);
  const [priceSavedMsg, setPriceSavedMsg] = useState<string>("");

  useEffect(() => {
    fetch("/api/admin/agencies")
      .then((r) => r.json())
      .then((d) => {
        if (d.agencies) setAgencies(d.agencies);
      });

    fetch("/api/admin/candidates")
      .then((r) => r.json())
      .then((d) => {
        if (d.candidates) setCandidates(d.candidates);
      });

    fetch("/api/admin/config")
      .then((r) => r.json())
      .then((d) => {
        if (d.candidate_price_usd) {
          setPriceUsd(d.candidate_price_usd);
          setNewPriceInput(d.candidate_price_usd.toString());
        }
      });
  }, []);

  const handleUpdatePrice = async (e: React.FormEvent) => {
    e.preventDefault();
    setPriceSaving(true);
    setPriceSavedMsg("");

    try {
      const res = await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceUsd: newPriceInput }),
      });
      const data = await res.json();
      if (data.candidate_price_usd) {
        setPriceUsd(data.candidate_price_usd);
        setPriceSavedMsg("Tarif mis à jour avec succès !");
        setTimeout(() => setPriceSavedMsg(""), 3000);
      }
    } catch {
      setPriceSavedMsg("Erreur de mise à jour.");
    } finally {
      setPriceSaving(false);
    }
  };

  const activeAgencies = agencies.filter((a) => a.status === "ACTIVE").length;
  const unlockedCandidates = candidates.filter((c) => c.status === "UNLOCKED").length;
  const totalBalanceInCirculation = agencies.reduce((acc, a) => acc + (a.balance_usd || 0), 0);

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
          Console d&apos;Administration Plateforme
        </h1>
        <p className="text-xs text-zinc-400 font-sans mt-1">
          Supervision globale du réseau multi-agences, des flux de candidatures et de la rentabilité.
        </p>
      </div>

      {/* ── Metrics Overview Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Agences */}
        <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 space-y-2">
          <p className="text-[10px] font-sans font-bold uppercase tracking-wider text-zinc-400">
            Agences Partenaires
          </p>
          <h3 className="font-serif text-3xl font-bold text-white">{agencies.length}</h3>
          <p className="text-[11px] text-emerald-400">{activeAgencies} agence(s) active(s)</p>
        </div>

        {/* Total Candidats */}
        <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 space-y-2">
          <p className="text-[10px] font-sans font-bold uppercase tracking-wider text-zinc-400">
            Candidats Générés
          </p>
          <h3 className="font-serif text-3xl font-bold text-white">{candidates.length}</h3>
          <p className="text-[11px] text-zinc-400">{candidates.length - unlockedCandidates} en attente</p>
        </div>

        {/* Candidats Débloqués */}
        <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 space-y-2">
          <p className="text-[10px] font-sans font-bold uppercase tracking-wider text-zinc-400">
            Candidats Débloqués
          </p>
          <h3 className="font-serif text-3xl font-bold text-brand-gold">{unlockedCandidates}</h3>
          <p className="text-[11px] text-zinc-400">Chiffre d&apos;affaires généré : ${(unlockedCandidates * priceUsd).toFixed(2)} USD</p>
        </div>

        {/* Solde en Circulation */}
        <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 space-y-2">
          <p className="text-[10px] font-sans font-bold uppercase tracking-wider text-zinc-400">
            Soldes Prépayés Actifs
          </p>
          <h3 className="font-serif text-3xl font-bold text-emerald-400">${totalBalanceInCirculation.toFixed(2)} USD</h3>
          <p className="text-[11px] text-zinc-400">Fonds déjà sécurisés</p>
        </div>
      </div>

      {/* ── Global Candidate Price Setting ── */}
      <div className="p-6 rounded-3xl bg-zinc-900/30 border border-white/10 space-y-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-white">
            Tarif Commercial de Transmission par Candidat
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Ce prix en USD est automatiquement déduit du solde partenaire lors de chaque déblocage.
          </p>
        </div>

        <form onSubmit={handleUpdatePrice} className="flex flex-col sm:flex-row sm:items-center gap-4 max-w-lg">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
            <input
              type="number"
              min="1"
              step="0.5"
              value={newPriceInput}
              onChange={(e) => setNewPriceInput(e.target.value)}
              className="w-full pl-8 pr-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white font-mono text-sm outline-none focus:border-red-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-400">USD / candidat</span>
          </div>
          <button
            type="submit"
            disabled={priceSaving}
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-sans text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shrink-0"
          >
            {priceSaving ? "Enregistrement..." : "Appliquer le Tarif"}
          </button>
        </form>

        {priceSavedMsg && (
          <p className="text-xs text-emerald-400 font-semibold">{priceSavedMsg}</p>
        )}
      </div>

      {/* ── Fast Navigation Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link
          href="/admin/agencies"
          className="p-6 rounded-3xl bg-zinc-900/20 border border-white/5 hover:border-red-500/30 transition-all space-y-2 block group"
        >
          <span className="text-2xl">🏢</span>
          <h4 className="font-serif text-base font-bold text-white group-hover:text-red-400 transition-colors">
            Gérer les Agences
          </h4>
          <p className="text-xs text-zinc-400">
            Valider de nouveaux partenaires, voir leurs soldes et suspendre ou éditer un compte.
          </p>
        </Link>

        <Link
          href="/admin/candidates"
          className="p-6 rounded-3xl bg-zinc-900/20 border border-white/5 hover:border-red-500/30 transition-all space-y-2 block group"
        >
          <span className="text-2xl">👥</span>
          <h4 className="font-serif text-base font-bold text-white group-hover:text-red-400 transition-colors">
            Toutes les Candidatures
          </h4>
          <p className="text-xs text-zinc-400">
            Explorer les leads enregistrés, les agences d&apos;affectation et les consentements RGPD.
          </p>
        </Link>

        <Link
          href="/admin/transactions"
          className="p-6 rounded-3xl bg-zinc-900/20 border border-white/5 hover:border-red-500/30 transition-all space-y-2 block group"
        >
          <span className="text-2xl">💰</span>
          <h4 className="font-serif text-base font-bold text-white group-hover:text-red-400 transition-colors">
            Transactions &amp; Remboursements
          </h4>
          <p className="text-xs text-zinc-400">
            Journal complet des paiements PayPal et bouton de régularisation / remboursement manuel.
          </p>
        </Link>
      </div>
    </div>
  );
}
