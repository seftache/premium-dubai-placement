import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Emplois Dubaï",
  description: "Politique de protection des données et de confidentialité des candidats.",
};

export default function ConfidentialitePage() {
  return (
    <div className="relative min-h-screen bg-brand-black text-white">
      {/* Glow effect */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-gold/[0.02] blur-[150px]" />

      <div className="legal-container relative z-10">
        
        {/* Breadcrumb */}
        <div className="mb-8 font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">
          <Link href="/" className="hover:text-brand-gold transition-colors">Accueil</Link>
          <span className="mx-2 text-white/20">/</span>
          <span className="text-brand-gold">Confidentialité</span>
        </div>

        {/* Header */}
        <h1 className="legal-title">
          Politique de <span className="text-gold-gradient">Confidentialité</span>
        </h1>

        {/* Content */}
        <div>
          
          <section>
            <h2 className="legal-section-title">1. Collecte et Traitement des Données</h2>
            <p className="legal-text">
              Emplois Dubaï s&apos;engage à protéger la vie privée et les informations personnelles des candidats. Les données personnelles collectées lors de la soumission de candidature (Nom Complet, Numéro WhatsApp, Domaine de Placement Recherché, Situation du Passeport) ont pour seul but de valider l&apos;éligibilité administrative pour les Émirats Arabes Unis.
            </p>
          </section>

          <section>
            <h2 className="legal-section-title">2. Transfert vers l&apos;API WhatsApp</h2>
            <p className="legal-text">
              Dans un souci de réactivité et de transparence, notre processus de capture interconnecte instantanément les données soumises avec l&apos;API WhatsApp Business sécurisée de notre Directrice de Recrutement. Vos informations sont cryptées de bout en bout par la technologie WhatsApp lors de l&apos;envoi du message.
            </p>
          </section>

          <section>
            <h2 className="legal-section-title">3. Conservation et Discrétion Absolue</h2>
            <p className="legal-text">
              Aucun profil candidat n&apos;est partagé avec des tiers non autorisés. Vos informations sont conservées temporairement durant toute la période d&apos;analyse et d&apos;attribution de votre visa de travail et de votre contrat de placement professionnel, avant d&apos;être archivées de manière sécurisée.
            </p>
          </section>

          <section>
            <h2 className="legal-section-title">4. Vos Droits d&apos;Accès et de Rectification</h2>
            <p className="legal-text">
              Conformément aux réglementations internationales de protection des données, vous disposez d&apos;un droit d&apos;accès permanent, de modification et de suppression de vos données personnelles. Pour exercer ce droit, vous pouvez à tout moment contacter la directrice via WhatsApp au numéro officiel :{" "}
              <a 
                href="https://wa.me/971526252539" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-brand-gold hover:text-brand-gold-light transition-colors font-medium underline underline-offset-4"
              >
                +971 52 625 2539
              </a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
