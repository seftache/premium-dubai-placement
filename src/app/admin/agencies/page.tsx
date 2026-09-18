"use client";

import { useState, useEffect } from "react";
import type { Agency } from "@/lib/types";

export default function AdminAgenciesPage() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    country: "United Arab Emirates",
    license_number: "",
    address: "",
  });

  const fetchAgencies = () => {
    setLoading(true);
    fetch("/api/admin/agencies")
      .then((r) => r.json())
      .then((data) => {
        if (data.agencies) setAgencies(data.agencies);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAgencies();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/agencies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsCreating(false);
        setFormData({
          company_name: "",
          contact_name: "",
          email: "",
          phone: "",
          country: "United Arab Emirates",
          license_number: "",
          address: "",
        });
        fetchAgencies();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    try {
      await fetch("/api/admin/agencies", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      fetchAgencies();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Agences Partenaires
          </h1>
          <p className="text-xs text-zinc-400 font-sans mt-1">
            Gestion du réseau d&apos;agences partenaires agréées, leurs soldes et leurs habilitations.
          </p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
        >
          + Ajouter une agence
        </button>
      </div>

      {/* ── Agencies Table ── */}
      <div className="p-6 rounded-3xl bg-zinc-900/30 border border-white/5">
        {loading ? (
          <div className="py-8 text-center text-xs text-zinc-400">Chargement des agences...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                  <th className="pb-3">Agence</th>
                  <th className="pb-3">Contact</th>
                  <th className="pb-3">Licence &amp; Pays</th>
                  <th className="pb-3 text-right">Solde Partenaire</th>
                  <th className="pb-3 text-center">Statut</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {agencies.map((agency) => (
                  <tr key={agency.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4">
                      <p className="font-semibold text-white">{agency.company_name}</p>
                      <p className="text-[11px] text-zinc-400">{agency.email}</p>
                    </td>
                    <td className="py-4">
                      <p className="text-white">{agency.contact_name}</p>
                      <p className="text-[11px] text-zinc-400 font-mono">{agency.phone || "—"}</p>
                    </td>
                    <td className="py-4">
                      <p className="text-zinc-200">{agency.country || "EAU"}</p>
                      <p className="text-[11px] text-zinc-400 font-mono">{agency.license_number || "En cours"}</p>
                    </td>
                    <td className="py-4 text-right font-mono font-bold text-brand-gold">
                      ${agency.balance_usd.toFixed(2)} USD
                    </td>
                    <td className="py-4 text-center">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          agency.status === "ACTIVE"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}
                      >
                        {agency.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button
                        onClick={() => handleToggleStatus(agency.id, agency.status)}
                        className="text-xs text-zinc-400 hover:text-white underline cursor-pointer"
                      >
                        {agency.status === "ACTIVE" ? "Suspendre" : "Activer"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Modal Create Agency ── */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <form
            onSubmit={handleCreate}
            className="w-full max-w-lg rounded-3xl bg-zinc-950 border border-red-500/30 p-8 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-serif text-lg font-bold text-white">Créer une Agence Partenaire</h3>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-zinc-400">Nom de l&apos;Agence / Société *</label>
                <input
                  type="text"
                  required
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white outline-none focus:border-red-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400">Nom du Responsable *</label>
                <input
                  type="text"
                  required
                  value={formData.contact_name}
                  onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white outline-none focus:border-red-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400">Email Professionnel *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white outline-none focus:border-red-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400">Téléphone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white outline-none focus:border-red-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400">Numéro de Licence Commerciale</label>
                <input
                  type="text"
                  value={formData.license_number}
                  onChange={(e) => setFormData({ ...formData, license_number: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white outline-none focus:border-red-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400">Pays d&apos;implantation</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2.5 rounded-xl text-xs text-zinc-400 hover:text-white"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase transition-all cursor-pointer"
              >
                Enregistrer l&apos;agence
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
