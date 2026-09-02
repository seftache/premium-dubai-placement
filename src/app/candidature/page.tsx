import type { Metadata } from "next";
import { ApplicationForm } from "@/components/ApplicationForm";

export const metadata: Metadata = {
  title: "Déposer votre Profil pour les Opportunités à Dubaï | Emplois Dubaï",
  description:
    "Déposez votre profil pour accéder aux opportunités d'emploi à Dubaï. Formulaire de mise en relation rapide — analyse de profil et transmission aux recruteurs partenaires.",
  keywords: [
    "postuler emploi dubaï",
    "candidature travail dubaï",
    "recrutement dubaï formulaire",
    "trouver un emploi à dubaï",
    "mise en relation emploi dubai",
    "emplois dubaï",
  ],
  alternates: {
    canonical: "https://emploisdubai.com/candidature",
  },
  openGraph: {
    title: "Déposer votre Profil pour les Opportunités à Dubaï | Emplois Dubaï",
    description:
      "Soumettez votre profil pour être mis en relation avec des recruteurs partenaires à Dubaï. Analyse sous 48h.",
    url: "https://emploisdubai.com/candidature",
  },
};

export default function CandidaturePage() {
  return <ApplicationForm />;
}


