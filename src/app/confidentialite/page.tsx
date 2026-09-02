import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_CONFIG } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Emplois Dubaï",
  description: "Politique de protection des données et de confidentialité des candidats et utilisateurs.",
  alternates: {
    canonical: "https://emploisdubai.com/confidentialite",
  },
};

export default function ConfidentialitePage() {
  return (
    <div className="relative min-h-screen bg-brand-black text-white py-24">
      {/* Glow effect */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-gold/[0.02] blur-[150px]" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Breadcrumb */}
        <div className="mb-8 font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">
          <Link href="/" className="hover:text-brand-gold transition-colors">Accueil</Link>
          <span className="mx-2 text-white/20">/</span>
          <span className="text-brand-gold">Confidentialité</span>
        </div>

        {/* Header */}
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-12">
          Politique de <span className="text-brand-gold">Confidentialité</span>
        </h1>

        {/* Mandatory Legal Clause Banner */}
        <div className="mb-12 p-6 rounded-2xl border border-brand-gold/30 bg-brand-gold/5 backdrop-blur-md">
          <h2 className="text-sm font-sans font-bold tracking-wider uppercase text-brand-gold mb-3">
            Engagement &amp; Rôle de la Plateforme
          </h2>
          <p className="text-sm font-sans text-zinc-200 leading-relaxed font-medium">
            Emplois Dubaï est un portail de mise en relation (B2B/B2C). Nous ne délivrons ni visas, ni contrats de travail, ni logements. Les données collectées via nos formulaires sont strictement utilisées pour la mise en relation avec nos agences partenaires.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-sm font-sans text-zinc-300 font-light leading-relaxed">
          
          <section className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h2 className="text-lg font-serif font-semibold text-white mb-3">1. Collecte et Finalité des Données</h2>
            <p>
              Emplois Dubaï accorde une importance primordiale à la confidentialité de vos informations. Les données collectées lors du dépôt de candidature (Nom complet, coordonnées WhatsApp, domaine de compétences recherché, statut du passeport) ont pour finalité exclusive d&apos;évaluer les profils et de permettre la mise en relation ciblée avec des employeurs et agences partenaires aux Émirats Arabes Unis.
            </p>
          </section>

          <section className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h2 className="text-lg font-serif font-semibold text-white mb-3">2. Modalités de Transmission</h2>
            <p>
              Lorsque vous validez le formulaire de candidature, un récapitulatif structuré est généré pour vous permettre de transmettre directement vos éléments via messagerie instantanée sécurisée WhatsApp ou email à notre équipe de modération et d&apos;orientation. Vos échanges sont ainsi protégés par le chiffrement de bout en bout propre à la plateforme de messagerie.
            </p>
          </section>

          <section className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h2 className="text-lg font-serif font-semibold text-white mb-3">3. Partage et Conservation</h2>
            <p>
              Vos informations ne sont jamais cédées ni vendues à des tiers à des fins commerciales non sollicitées. Elles sont uniquement transmises, avec votre accord, à nos partenaires recruteurs dans le cadre de l&apos;étude de votre candidature ou de votre projet. Les données sont conservées pendant la durée nécessaire au traitement de la demande de mise en relation.
            </p>
          </section>

          <section className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h2 className="text-lg font-serif font-semibold text-white mb-3">4. Vos Droits (Accès, Rectification, Suppression)</h2>
            <p className="mb-4">
              Conformément à la réglementation applicable en matière de protection des données, vous disposez d&apos;un droit d&apos;accès, de rectification et d&apos;effacement des données vous concernant. Pour exercer ces droits, vous pouvez nous contacter à tout moment :
            </p>
            {CONTACT_CONFIG.whatsappUrl ? (
              <a 
                href={CONTACT_CONFIG.whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-brand-gold/40 text-brand-gold font-sans font-semibold text-xs tracking-wider uppercase hover:bg-brand-gold hover:text-black transition-all duration-300"
              >
                Contacter le support ({CONTACT_CONFIG.whatsappNumber || CONTACT_CONFIG.phone})
              </a>
            ) : (
              <p className="text-zinc-400">
                Contact : {CONTACT_CONFIG.email || CONTACT_CONFIG.phone || "Via le formulaire en ligne"}
              </p>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}
