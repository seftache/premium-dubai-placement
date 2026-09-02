import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_CONFIG } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation | Emplois Dubaï",
  description: "Conditions générales d'utilisation du portail de mise en relation Emplois Dubaï.",
  alternates: {
    canonical: "https://emploisdubai.com/conditions-generales",
  },
};

export default function ConditionsGeneralesPage() {
  return (
    <div className="relative min-h-screen bg-brand-black text-white py-24">
      {/* Glow effect */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-gold/[0.02] blur-[150px]" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Breadcrumb */}
        <div className="mb-8 font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">
          <Link href="/" className="hover:text-brand-gold transition-colors">Accueil</Link>
          <span className="mx-2 text-white/20">/</span>
          <span className="text-brand-gold">Conditions Générales</span>
        </div>

        {/* Header */}
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-12">
          Conditions Générales <span className="text-brand-gold">d&apos;Utilisation</span>
        </h1>

        {/* Mandatory Legal Clause Banner */}
        <div className="mb-12 p-6 rounded-2xl border border-brand-gold/30 bg-brand-gold/5 backdrop-blur-md">
          <h2 className="text-sm font-sans font-bold tracking-wider uppercase text-brand-gold mb-3">
            Clause Fondamentale de Service
          </h2>
          <p className="text-sm font-sans text-zinc-200 leading-relaxed font-medium">
            Emplois Dubaï est un portail de mise en relation (B2B/B2C). Nous ne délivrons ni visas, ni contrats de travail, ni logements. Les données collectées via nos formulaires sont strictement utilisées pour la mise en relation avec nos agences partenaires.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-sm font-sans text-zinc-300 font-light leading-relaxed">
          
          <section className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h2 className="text-lg font-serif font-semibold text-white mb-3">1. Objet du Service</h2>
            <p>
              Le présent site a pour objet exclusif la mise en relation entre d&apos;une part des candidats ou porteurs de projets, et d&apos;autre part des agences de recrutement, employeurs et partenaires commerciaux établis aux Émirats Arabes Unis. Emplois Dubaï ne saurait être assimilé à un employeur direct, une agence d&apos;intérim ou une autorité gouvernementale d&apos;immigration.
            </p>
          </section>

          <section className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h2 className="text-lg font-serif font-semibold text-white mb-3">2. Absence de Garantie de Résultat</h2>
            <p>
              Les opportunités présentées sur la plateforme dépendent des besoins évolutifs des recruteurs partenaires. Emplois Dubaï ne garantit en aucun cas l&apos;obtention systématique d&apos;un poste, d&apos;un visa de travail ou d&apos;un contrat d&apos;expatriation. L&apos;octroi d&apos;un visa demeure à l&apos;entière appréciation des services de l&apos;immigration des E.A.U.
            </p>
          </section>

          <section className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h2 className="text-lg font-serif font-semibold text-white mb-3">3. Relations Commerciales et Contrats Tiers</h2>
            <p>
              Pour les volets de commerce international et de recrutement, tout accord, transaction ou contrat de travail est conclu directement et sans intermédiaire juridique entre l&apos;utilisateur et le partenaire tiers concerné. Emplois Dubaï décline toute responsabilité quant à l&apos;exécution, l&apos;inexécution ou les litiges pouvant survenir entre les parties contractantes.
            </p>
          </section>

          <section className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h2 className="text-lg font-serif font-semibold text-white mb-3">4. Engagements de l&apos;Utilisateur</h2>
            <p>
              L&apos;utilisateur s&apos;engage à fournir des renseignements exacts, sincères et vérifiables lors de la soumission de son dossier de candidature ou de sa demande de contact. Toute fausse déclaration ou tentative d&apos;usurpation d&apos;identité entraînera l&apos;interruption immédiate de la mise en relation.
            </p>
          </section>

          <section className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h2 className="text-lg font-serif font-semibold text-white mb-3">5. Contact</h2>
            <p>
              Pour toute question relative aux présentes conditions, vous pouvez contacter notre service d&apos;assistance :{" "}
              <span className="text-brand-gold font-medium">{CONTACT_CONFIG.phone || CONTACT_CONFIG.email || "Via nos canaux officiels"}</span>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
