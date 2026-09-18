"use client";

import { useState, useEffect } from "react";
import type { Contract } from "@/lib/types";

export default function PartnerContractsPage() {
  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [signerName, setSignerName] = useState<string>("");
  const [signerEmail, setSignerEmail] = useState<string>("");
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [isSigning, setIsSigning] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    // In demo / current phase, fetch demo contract
    fetch("/api/partner/balance")
      .then(() => {
        // Sample contract data
        setContract({
          id: "contract-demo-1",
          agency_id: "agency-demo-1",
          version: 1,
          title: "Convention de Partenariat & Transmission de Candidats — EmploisDubai",
          content_md: `# CONVENTION COMMERCIALE DE MISE EN RELATION ET D'INTERMÉDIATION

Entre les soussignés :

1. La plateforme **EmploisDubai.com**, portail de mise en relation professionnelle indépendant.
2. L'**Agence Partenaire Bénéficiaire**, dûment habilitée à exercer ses activités aux Émirats Arabes Unis ou à l'international.

---

### ARTICLE 1 — OBJET DU CONTRAT
La présente convention a pour objet de régir les conditions techniques et financières dans lesquelles EmploisDubai.com transmet à l'Agence Partenaire des candidatures qualifiées de personnes intéressées par des opportunités professionnelles à Dubaï.

### ARTICLE 2 — MODÈLE DE TRANSMISSION & TARIFICATION
1. La transmission de chaque profil qualifié fait l'objet d'une tarification fixe de **10 USD (Dix dollars américains)**.
2. Ce montant est automatiquement et préalablement déduit du **Solde Partenaire** prépayé de l'Agence.
3. **Absence de commission ultérieure** : EmploisDubai ne perçoit aucun pourcentage sur les rémunérations ou honoraires convenus ultérieurement entre l'Agence et le candidat ou l'employeur sponsor.

### ARTICLE 3 — PROTECTION DES DONNÉES & CONFIDENTIALITÉ (RGPD)
L'Agence s'engage expressément à :
- Ne traiter les données du candidat (nom, email, téléphone, passeport) qu'aux fins exclusives de proposition d'opportunité professionnelle.
- Ne pas céder, revendre ou divulguer ces coordonnées à des tiers non autorisés.
- Respecter les droits d'accès, de rectification et d'effacement des candidats conformément aux réglementations applicables.

### ARTICLE 4 — DÉMARCHES LÉGALES & VISAS
L'Agence Partenaire assume l'entière responsabilité :
- Du respect de la législation du travail en vigueur aux Émirats Arabes Unis (MOHRE, GDRFA, ICP).
- De la vérification de l'adéquation du profil avec les exigences de l'employeur sponsor.
- De l'absence de perception de frais illégaux auprès des candidats lorsque proscrits par les lois locales.

### ARTICLE 5 — FORCE PROBANTE DE LA SIGNATURE ÉLECTRONIQUE
Les parties conviennent expressément que la signature électronique effectuée via l'Espace Partenaire, accompagnée de l'horodatage, de l'adresse IP et de l'empreinte cryptographique du présent acte, a la même valeur juridique qu'un acte sous seing privé manuscrit.`,
          content_hash: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
          status: "SENT",
          signed_at: null,
          signer_name: null,
          signer_email: null,
          signer_ip: null,
          signer_user_agent: null,
          signature_data: null,
          pdf_url: null,
          created_at: new Date().toISOString(),
          sent_at: new Date().toISOString(),
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signerName || !signerEmail || !acceptTerms) {
      setStatusMsg({
        type: "error",
        text: "Veuillez renseigner votre nom complet, votre email professionnel et cocher la case d'engagement.",
      });
      return;
    }

    if (!contract) return;

    setIsSigning(true);
    setStatusMsg(null);

    try {
      const res = await fetch(`/api/partner/contracts/${contract.id}/sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signerName, signerEmail }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Erreur de signature.");
      }

      setContract(data.contract);
      setStatusMsg({
        type: "success",
        text: "Contrat signé avec succès et scellé cryptographiquement !",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur lors de la signature.";
      setStatusMsg({ type: "error", text: msg });
    } finally {
      setIsSigning(false);
    }
  };

  if (loading) {
    return <div className="py-16 text-center text-xs text-zinc-400">Chargement du contrat...</div>;
  }

  const isSigned = contract?.status === "SIGNED";

  return (
    <div className="space-y-8 max-w-4xl">
      {/* ── Header ── */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
          Convention Partenaire Électronique
        </h1>
        <p className="text-xs text-zinc-400 font-sans mt-1">
          Consultez et signez en ligne votre accord de transmission de candidatures qualifiées.
        </p>
      </div>

      {/* ── Status Banner ── */}
      <div
        className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
          isSigned
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
            : "bg-amber-500/10 border-amber-500/30 text-amber-300"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">{isSigned ? "✅" : "⏳"}</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider">
              {isSigned ? "Convention Signée & Verrouillée" : "En attente de signature électronique"}
            </p>
            <p className="text-[11px] opacity-80 mt-0.5">
              {isSigned
                ? `Signée le ${new Date(contract!.signed_at!).toLocaleString("fr-FR")} par ${contract!.signer_name} (${contract!.signer_email})`
                : "Veuillez lire le document ci-dessous et apposer votre signature pour valider votre statut partenaire."}
            </p>
          </div>
        </div>

        {isSigned && (
          <button
            onClick={() => window.print()}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 text-xs font-semibold transition-colors shrink-0"
          >
            Imprimer / PDF
          </button>
        )}
      </div>

      {/* ── Document Viewer ── */}
      <div className="p-8 rounded-3xl bg-zinc-950 border border-white/10 shadow-2xl space-y-6 font-sans text-xs leading-relaxed text-zinc-300">
        <div className="border-b border-white/10 pb-4 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase text-zinc-400">
            Document ID: #{contract?.id} (v{contract?.version})
          </span>
          <span className="font-mono text-[10px] text-zinc-400 truncate max-w-xs">
            SHA-256: {contract?.content_hash}
          </span>
        </div>

        {/* Content Render */}
        <div className="whitespace-pre-line font-light space-y-4">
          {contract?.content_md}
        </div>

        {/* Signed Seal if Signed */}
        {isSigned && (
          <div className="mt-8 pt-6 border-t border-emerald-500/30 p-4 rounded-2xl bg-emerald-500/[0.04] space-y-2 font-mono text-[11px] text-emerald-400">
            <div className="font-bold uppercase tracking-wider">Sceau Électronique Certifié :</div>
            <div>Signataire : {contract?.signer_name} &lt;{contract?.signer_email}&gt;</div>
            <div>Date et heure : {contract?.signed_at}</div>
            <div>Adresse IP : {contract?.signer_ip || "Vérifiée"}</div>
            <div>Statut : VERROUILLÉ (Toute modification ultérieure nécessitera un avenant officiel)</div>
          </div>
        )}
      </div>

      {/* ── Signature Form if Not Signed ── */}
      {!isSigned && (
        <form onSubmit={handleSign} className="p-8 rounded-3xl bg-zinc-900/40 border border-white/10 space-y-6">
          <h3 className="font-serif text-lg font-bold text-white">Apposer votre signature électronique</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400 uppercase font-bold tracking-wider">
                Nom complet du signataire :
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Karim Al Mansoori"
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs outline-none focus:border-brand-gold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400 uppercase font-bold tracking-wider">
                Email professionnel du signataire :
              </label>
              <input
                type="email"
                required
                placeholder="Ex: karim@agence.ae"
                value={signerEmail}
                onChange={(e) => setSignerEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs outline-none focus:border-brand-gold"
              />
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <input
              type="checkbox"
              id="accept-contract"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-white/20 bg-zinc-900 accent-[#c9a96e] cursor-pointer"
            />
            <label htmlFor="accept-contract" className="text-xs text-zinc-400 leading-relaxed cursor-pointer">
              Je confirme être légalement habilité(e) à engager mon agence partenaire et j&apos;accepte sans réserve les termes de la présente convention commerciale.
            </label>
          </div>

          {statusMsg && (
            <div
              className={`p-3 rounded-xl text-xs ${
                statusMsg.type === "success"
                  ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                  : "bg-amber-500/10 border border-amber-500/20 text-amber-400"
              }`}
            >
              {statusMsg.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isSigning || !acceptTerms}
            className="px-8 py-4 rounded-full bg-brand-gold hover:bg-brand-gold-light text-black font-sans text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(201,169,110,0.3)] disabled:opacity-50 cursor-pointer"
          >
            {isSigning ? "Scellage en cours..." : "Signer et Sceller la Convention"}
          </button>
        </form>
      )}
    </div>
  );
}
