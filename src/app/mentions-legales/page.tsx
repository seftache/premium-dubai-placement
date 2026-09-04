import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_CONFIG } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Mentions Légales | Emplois Dubaï",
  description: "Mentions légales et informations juridiques concernant le portail Emplois Dubaï.",
  alternates: {
    canonical: "https://emploisdubai.com/mentions-legales",
  },
};

export default function MentionsLegalesPage() {
  return (
    <div className="relative min-h-screen bg-brand-black text-white py-24">
      {/* Glow effect */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-gold/[0.02] blur-[150px]" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Breadcrumb */}
        <div className="mb-8 font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">
          <Link href="/" className="hover:text-brand-gold transition-colors">Accueil</Link>
          <span className="mx-2 text-white/20">/</span>
          <span className="text-brand-gold">Mentions Légales</span>
        </div>

        {/* Header */}
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-12">
          Mentions <span className="text-brand-gold">Légales</span>
        </h1>

        {/* Mandatory Legal Clause Banner */}
        <div className="mb-12 p-6 rounded-2xl border border-brand-gold/30 bg-brand-gold/5 backdrop-blur-md">
          <h2 className="text-sm font-sans font-bold tracking-wider uppercase text-brand-gold mb-3">
            Avis Légal Important
          </h2>
          <p className="text-sm font-sans text-zinc-200 leading-relaxed font-medium">
            Emplois Dubaï est un portail de mise en relation (B2B/B2C). Nous ne délivrons ni visas, ni contrats de travail, ni logements. Les données collectées via nos formulaires sont strictement utilisées pour la mise en relation avec nos agences partenaires.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-sm font-sans text-zinc-300 font-light leading-relaxed">
          
          <section className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h2 className="text-lg font-serif font-semibold text-white mb-3">1. Présentation de la Plateforme</h2>
            <p>
              Le site <strong>Emplois Dubaï</strong> est un portail numérique d&apos;information et d&apos;intermédiation (mise en relation) mettant en relation des candidats et porteurs de projets avec des recruteurs, agences et partenaires commerciaux indépendants établis aux Émirats Arabes Unis.
            </p>
          </section>

          <section className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h2 className="text-lg font-serif font-semibold text-white mb-3">2. Éditeur et Contact</h2>
            <p>
              La plateforme <strong>Emplois Dubaï</strong> est exploitée à titre de portail numérique indépendant.
              <br />
              <strong>Contact &amp; Assistance :</strong>{" "}
              <span>Via le formulaire de contact et de candidature en ligne ({CONTACT_CONFIG.email}).</span>
              <br />
              <span className="text-xs text-white/50">{CONTACT_CONFIG.agencyPhonePlaceholder} ({CONTACT_CONFIG.agencyPhoneNotice}).</span>
            </p>
          </section>

          <section className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h2 className="text-lg font-serif font-semibold text-white mb-3">3. Hébergement du Site</h2>
            <p>
              Le site est hébergé par :<br />
              <strong>Vercel Inc.</strong><br />
              440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.<br />
              Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">vercel.com</a>
            </p>
          </section>

          <section className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h2 className="text-lg font-serif font-semibold text-white mb-3">4. Limitation de Responsabilité</h2>
            <p>
              Emplois Dubaï intervient exclusivement en qualité d&apos;intermédiaire technique et informatif. La délivrance de visas, permis de travail et cartes de résidence relève exclusivement de la compétence souveraine des autorités des Émirats Arabes Unis (MOHRE, GDRFA, ICP). Les conditions de travail, salaires et hébergements sont arrêtés directement et exclusivement entre le candidat et l&apos;employeur partenaire.
            </p>
          </section>

          <section className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h2 className="text-lg font-serif font-semibold text-white mb-3">5. Propriété Intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus (textes, graphismes, logos, éléments visuels) figurant sur ce portail est protégé par les lois internationales relatives à la propriété intellectuelle. Toute reproduction non autorisée est strictement prohibée.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
