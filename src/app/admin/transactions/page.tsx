"use client";

import { useState, useEffect } from "react";
import type { Transaction, Agency } from "@/lib/types";

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Refund modal
  const [isRefunding, setIsRefunding] = useState<boolean>(false);
  const [selectedAgencyId, setSelectedAgencyId] = useState<string>("");
  const [refundAmount, setRefundAmount] = useState<string>("");
  const [refundReason, setRefundReason] = useState<string>("");
  const [refundStatus, setRefundStatus] = useState<string>("");

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      fetch("/api/admin/transactions").then((r) => r.json()),
      fetch("/api/admin/agencies").then((r) => r.json()),
    ])
      .then(([txData, agencyData]) => {
        if (txData.transactions) setTransactions(txData.transactions);
        if (agencyData.agencies) {
          setAgencies(agencyData.agencies);
          if (agencyData.agencies.length > 0) setSelectedAgencyId(agencyData.agencies[0].id);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExecuteRefund = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAgencyId || !refundAmount || !refundReason) return;

    try {
      const res = await fetch("/api/admin/refund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agencyId: selectedAgencyId,
          amountUsd: refundAmount,
          reason: refundReason,
          adminId: "superadmin-root",
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRefundStatus(data.message);
        setTimeout(() => {
          setIsRefunding(false);
          setRefundStatus("");
          setRefundAmount("");
          setRefundReason("");
          fetchData();
        }, 1500);
      } else {
        setRefundStatus(`Erreur : ${data.error}`);
      }
    } catch {
      setRefundStatus("Erreur réseau.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Finances &amp; Journal des Transactions
          </h1>
          <p className="text-xs text-zinc-400 font-sans mt-1">
            Traçabilité intégrale des recharges PayPal, des déductions de candidats et des régularisations.
          </p>
        </div>

        <button
          onClick={() => setIsRefunding(true)}
          className="px-5 py-2.5 rounded-full bg-amber-600 hover:bg-amber-500 text-black font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
        >
          ⚡ Régularisation / Remboursement
        </button>
      </div>

      {/* ── Transaction Table ── */}
      <div className="p-6 rounded-3xl bg-zinc-900/30 border border-white/5">
        {loading ? (
          <div className="py-8 text-center text-xs text-zinc-400">Chargement des transactions...</div>
        ) : transactions.length === 0 ? (
          <div className="py-8 text-center text-xs text-zinc-400">Aucune transaction enregistrée.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                  <th className="pb-3">Date &amp; Heure</th>
                  <th className="pb-3">Agence</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Description</th>
                  <th className="pb-3 text-right">Montant</th>
                  <th className="pb-3 text-right">Solde Après</th>
                  <th className="pb-3 text-right">Opérateur</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {transactions.map((tx) => {
                  const isPositive = tx.amount_usd > 0;
                  const agency = agencies.find((a) => a.id === tx.agency_id);

                  return (
                    <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 font-mono text-zinc-400">
                        {new Date(tx.created_at).toLocaleString("fr-FR")}
                      </td>
                      <td className="py-4 font-semibold text-white">
                        {agency?.company_name || tx.agency_id}
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            tx.type === "TOPUP"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : tx.type === "UNLOCK"
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-4 text-zinc-300">{tx.description}</td>
                      <td className={`py-4 text-right font-mono font-bold ${isPositive ? "text-emerald-400" : "text-zinc-300"}`}>
                        {isPositive ? `+$${tx.amount_usd.toFixed(2)}` : `-$${Math.abs(tx.amount_usd).toFixed(2)}`} USD
                      </td>
                      <td className="py-4 text-right font-mono text-zinc-400">
                        ${tx.balance_after.toFixed(2)} USD
                      </td>
                      <td className="py-4 text-right text-[11px] font-mono text-zinc-400">
                        {tx.created_by}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Refund Modal ── */}
      {isRefunding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <form
            onSubmit={handleExecuteRefund}
            className="w-full max-w-md rounded-3xl bg-zinc-950 border border-amber-500/30 p-8 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-serif text-lg font-bold text-white">Régularisation / Remboursement de Solde</h3>
              <button
                type="button"
                onClick={() => setIsRefunding(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-zinc-400">Agence Partenaire concernée :</label>
                <select
                  value={selectedAgencyId}
                  onChange={(e) => setSelectedAgencyId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white outline-none"
                >
                  {agencies.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.company_name} (Solde actuel : ${a.balance_usd.toFixed(2)} USD)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400">Montant du Remboursement (USD) :</label>
                <input
                  type="number"
                  required
                  step="0.01"
                  placeholder="Ex: 10.00"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400">Motif administratif obligatoire :</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Ex: Erreur de saisie candidat / Annulation convenue"
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {refundStatus && (
              <p className="text-xs text-amber-400 font-semibold">{refundStatus}</p>
            )}

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsRefunding(false)}
                className="px-4 py-2.5 rounded-xl text-xs text-zinc-400 hover:text-white"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs uppercase transition-all cursor-pointer"
              >
                Valider l&apos;opération
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
