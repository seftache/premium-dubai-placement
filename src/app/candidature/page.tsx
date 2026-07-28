import type { Metadata } from "next";
import { ApplicationForm } from "@/components/ApplicationForm";

export const metadata: Metadata = {
  title: "Postuler aux Offres d'Emploi à Dubaï | Candidature Rapide",
  description:
    "Postulez directement aux offres d'emploi à Dubaï. Formulaire de candidature rapide en ligne — réponse sous 48h, obtention du visa de résidence et du logement.",
  keywords: [
    "postuler emploi dubaï",
    "candidature travail dubaï",
    "recrutement dubaï formulaire",
    "trouver un emploi à dubaï",
    "visa travail dubaï candidature",
    "emplois dubaï",
  ],
  alternates: {
    canonical: "https://emploisdubai.com/candidature",
  },
  openGraph: {
    title: "Postuler aux Offres d'Emploi à Dubaï | Emplois Dubaï",
    description:
      "Soumettez votre candidature pour obtenir votre emploi et visa de travail à Dubaï. Analyse sous 48h.",
    url: "https://emploisdubai.com/candidature",
  },
};

export default function CandidaturePage() {
  return <ApplicationForm />;
}


