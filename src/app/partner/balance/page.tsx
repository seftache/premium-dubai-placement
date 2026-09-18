"use client";

import { useState, useEffect } from "react";
import type { Transaction } from "@/lib/types";

export default function PartnerBalancePage() {
  const [balance, setBalance] = useState<number>(120);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const fetchBalanceData = () => {
    setLoading(true);
    fetch("/api/partner/balance")
      .then((r) => r.json())
      .then((data) => {
        if (data.balance_usd !== undefined) setBalance(data.balance_usd);
        if (data.transactions) setTransactions(data.transactions);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBalanceData();
  }, []);

  const getEffectiveAmount = () => {
    if (selectedAmount === 0 && customAmount) {
      return parseFloat(customAmount) || 0;
    }
    return selectedAmount;
  };

  const handlePayPalTopUp = async () => {
    const amount = getEffectiveAmount();
    if (amount < 10) {
      setPaymentStatus({ type: "error", text: "Le montant minimum de recharge est de 10 USD." });
      return;
    }

    setIsProcessing(true);
    setPaymentStatus(null);

    try {
      // 1. Create order
      const createRes = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountUsd: amount }),
      });
      const createData = await createRes.json();

      if (!createRes.ok || !createData.success) {
        throw new Error(createData.error || "Échec de création de la commande PayPal.");
      }

      // 2. In sandbox/production, capture payment
      const captureRes = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: createData.orderId,
          amountUsd: amount,
        }),
      });
      const captureData = await captureRes.json();

      if (!captureRes.ok || !captureData.success) {
        throw new Error(captureData.error || "Échec de validation PayPal.");
      }

      setPaymentStatus({
        type: "success",
        text: `Paiement PayPal confirmé ! Votre solde a été crédité de $${amount.toFixed(2)} USD.`,
      });

      // Refresh data
      fetchBalanceData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur lors du paiement PayPal.";
      setPaymentStatus({ type: "error", text: msg });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
          Solde Partenaire &amp; Recharges
        </h1>
        <p className="text-xs text-zinc-400 font-sans mt-1">
          Alimentez votre solde prépayé par carte ou compte PayPal pour débloquer vos candidats.
        </p>
      </div>

      {/* ── Balance Overview Card ── */}
      <div className="p-8 rounded-3xl bg-zinc-900/50 border border-brand-gold/20 backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-sans font-bold tracking-[0.25em] uppercase text-brand-gold">
            Solde Disponible Actuel
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mt-2 tracking-tight">
            ${balance.toFixed(2)}{" "}
            <span className="text-lg font-sans font-normal text-zinc-400">USD</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-2">
            Équivalent à environ <span className="text-brand-gold font-bold">{Math.floor(balance / 10)} candidats</span> qualifiés déblocables immédiatement ($10 USD / candidat).
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1.5 text-xs">
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="text-emerald-400">✓</span> Déduction automatique sans commission cachée
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="text-emerald-400">✓</span> Idempotence garantie (zéro double facturation)
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="text-emerald-400">✓</span> Transactions chiffrées &amp; traçables
          </div>
        </div>
      </div>

      {/* ── PayPal Recharge Section ── */}
      <div className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 space-y-6">
        <div>
          <h3 className="font-serif text-xl font-bold text-white">Ajouter de l&apos;argent via PayPal</h3>
          <p className="text-xs text-zinc-400 mt-1">
            Sélectionnez un pack de recharge ou entrez le montant personnalisé de votre choix.
          </p>
        </div>

        {/* Amount Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { amount: 50, label: "$50 USD", candidates: "5 candidats" },
            { amount: 100, label: "$100 USD", candidates: "10 candidats", popular: true },
            { amount: 200, label: "$200 USD", candidates: "20 candidats" },
            { amount: 0, label: "Personnalisé", candidates: "Montant libre" },
          ].map((pack) => {
            const isSelected = selectedAmount === pack.amount;
            return (
              <button
                key={pack.amount}
                type="button"
                onClick={() => {
                  setSelectedAmount(pack.amount);
                  if (pack.amount !== 0) setCustomAmount("");
                }}
                className={`p-4 rounded-2xl border text-left transition-all relative cursor-pointer ${
                  isSelected
                    ? "bg-brand-gold/10 border-brand-gold text-white shadow-[0_0_20px_rgba(201,169,110,0.2)]"
                    : "bg-white/[0.02] border-white/5 text-zinc-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {pack.popular && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-brand-gold text-black uppercase">
                    Recommandé
                  </span>
                )}
                <div className="font-mono text-base font-bold text-white">{pack.label}</div>
                <div className="text-[11px] text-zinc-400 mt-1">{pack.candidates}</div>
              </button>
            );
          })}
        </div>

        {/* Custom amount field */}
        {selectedAmount === 0 && (
          <div className="max-w-xs space-y-1">
            <label className="text-[11px] text-zinc-400 uppercase font-bold tracking-wider">
              Montant en USD (Min. $10) :
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
              <input
                type="number"
                min="10"
                step="5"
                placeholder="Ex: 150"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white font-mono text-sm outline-none focus:border-brand-gold"
              />
            </div>
          </div>
        )}

        {/* Feedback Alert */}
        {paymentStatus && (
          <div
            className={`p-4 rounded-2xl text-xs flex items-center gap-3 ${
              paymentStatus.type === "success"
                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                : "bg-amber-500/10 border border-amber-500/20 text-amber-400"
            }`}
          >
            <span>{paymentStatus.type === "success" ? "✅" : "⚠️"}</span>
            <span>{paymentStatus.text}</span>
          </div>
        )}

        {/* Pay with PayPal Button */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
          <button
            type="button"
            onClick={handlePayPalTopUp}
            disabled={isProcessing || getEffectiveAmount() < 10}
            className="px-8 py-4 rounded-full bg-[#0070ba] hover:bg-[#005ea6] text-white font-sans text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(0,112,186,0.4)] disabled:opacity-50 flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>💳</span>
            {isProcessing ? "Traitement sécurisé..." : `Payer $${getEffectiveAmount().toFixed(2)} USD avec PayPal`}
          </button>
          <span className="text-[11px] text-zinc-400 font-light">
            Transaction protégée par les protocoles sécurisés PayPal (Sandbox &amp; Live).
          </span>
        </div>
      </div>

      {/* ── Complete Transaction Ledger Table ── */}
      <div className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-white">Historique Financier &amp; Transactions</h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Journal complet des recharges, déductions et éventuelles corrections.
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-400">Total : {transactions.length} opération(s)</span>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-zinc-400">Chargement des transactions...</div>
        ) : transactions.length === 0 ? (
          <div className="py-8 text-center text-xs text-zinc-400">Aucune transaction enregistrée.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Opération</th>
                  <th className="pb-3">Description</th>
                  <th className="pb-3 text-right">Montant</th>
                  <th className="pb-3 text-right">Solde Après</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {transactions.map((tx) => {
                  const isPositive = tx.amount_usd > 0;
                  return (
                    <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 text-zinc-400 font-mono">
                        {new Date(tx.created_at).toLocaleDateString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            tx.type === "TOPUP"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : tx.type === "UNLOCK"
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                          }`}
                        >
                          {tx.type === "TOPUP"
                            ? "Recharge"
                            : tx.type === "UNLOCK"
                            ? "Déblocage"
                            : "Régularisation"}
                        </span>
                      </td>
                      <td className="py-3.5 text-zinc-300">{tx.description}</td>
                      <td className={`py-3.5 text-right font-mono font-bold ${isPositive ? "text-emerald-400" : "text-zinc-300"}`}>
                        {isPositive ? `+$${tx.amount_usd.toFixed(2)}` : `-$${Math.abs(tx.amount_usd).toFixed(2)}`} USD
                      </td>
                      <td className="py-3.5 text-right font-mono text-zinc-400">
                        ${tx.balance_after.toFixed(2)} USD
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
