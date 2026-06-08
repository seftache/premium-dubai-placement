import type { Metadata } from "next";
import { ApplicationForm } from "@/components/ApplicationForm";

export const metadata: Metadata = {
  title: "Candidature — Postulez pour Dubaï",
  description:
    "Soumettez votre candidature pour travailler à Dubaï. Formulaire simple et rapide — notre équipe vous recontacte sous 48h via WhatsApp.",
  openGraph: {
    title: "Postulez pour Dubaï | Emplois Dubaï",
    description:
      "Soumettez votre candidature pour travailler à Dubaï. Réponse sous 48h.",
  },
};

export default function CandidaturePage() {
  return <ApplicationForm />;
}

