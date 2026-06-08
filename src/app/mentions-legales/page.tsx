import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions Légales | Emplois Dubaï",
  description: "Mentions légales et informations juridiques concernant Emplois Dubaï.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="relative min-h-screen bg-brand-black text-white">
      {/* Glow effect */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-gold/[0.02] blur-[150px]" />

      <div className="legal-container relative z-10">
        
        {/* Breadcrumb */}
        <div className="mb-8 font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">
          <Link href="/" className="hover:text-brand-gold transition-colors">Accueil</Link>
          <span className="mx-2 text-white/20">/</span>
          <span className="text-brand-gold">Mentions Légales</span>
        </div>

        {/* Header */}
        <h1 className="legal-title">
          Mentions <span className="text-gold-gradient">Légales</span>
        </h1>

        {/* Content */}
        <div>
          
          <section>
            <h2 className="legal-section-title">1. Présentation de la Plateforme</h2>
            <p className="legal-text">
              Le site <strong>Emplois Dubaï</strong> est une plateforme de conciergerie de recrutement d&apos;élite connectant les candidats internationaux avec des opportunités professionnelles exclusives aux Émirats Arabes Unis.
            </p>
          </section>

          <section>
            <h2 className="legal-section-title">2. Éditeur et Directeur de la Publication</h2>
            <p className="legal-text">
              La plateforme Emplois Dubaï et son accompagnement VIP sont supervisés directement par notre Directrice du Recrutement à Dubaï.
              <br />
              <strong>Contact Direct :</strong>{" "}
              <a 
                href="https://wa.me/971526252539" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-brand-gold hover:text-brand-gold-light transition-colors font-medium underline underline-offset-4"
              >
                +971 52 625 2539 (WhatsApp)
              </a>
            </p>
          </section>

          <section>
            <h2 className="legal-section-title">3. Hébergement du Site</h2>
            <p className="legal-text">
              Le site est hébergé de manière sécurisée auprès de serveurs professionnels haute disponibilité garantissant l&apos;accessibilité globale et la protection des formulaires.
            </p>
          </section>

          <section>
            <h2 className="legal-section-title">4. Propriété Intellectuelle</h2>
            <p className="legal-text">
              L&apos;intégralité des éléments constitutifs de ce site (textes, chartes graphiques, images, vidéos, animations, logos) est protégée par le droit de la propriété intellectuelle. Toute reproduction, représentation ou diffusion, en tout ou partie, du contenu de ce site sur quelque support ou par quelque procédé que ce soit est strictement interdite sans autorisation écrite préalable.
            </p>
          </section>

          <section>
            <h2 className="legal-section-title">5. Responsabilité et Données Candidats</h2>
            <p className="legal-text">
              Emplois Dubaï s&apos;efforce d&apos;assurer l&apos;exactitude des informations diffusées. Le traitement des candidatures soumises via notre formulaire est strictement confidentiel et vise uniquement la mise en relation avec nos partenaires émiratis.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
