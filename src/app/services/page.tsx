import type { Metadata } from "next";
import { ServicesCarousel } from "@/components/ServicesCarousel";

export const metadata: Metadata = {
  title: "Secteurs d'Emplois qui Recrutent à Dubaï | Emplois Dubaï",
  description:
    "Explorez tous les secteurs en fort recrutement à Dubaï : chauffeurs privés VIP, hôtellerie & restauration de luxe, sécurité, BTP, personnel de maison et santé aux Émirats.",
  keywords: [
    "emplois dubaï secteurs",
    "offres d'emploi dubaï hôtellerie",
    "emploi chauffeur privé dubaï",
    "recrutement sécurité dubaï",
    "emploi btp dubaï",
    "travail restauration dubaï",
    "recruteur dubaï",
  ],
  alternates: {
    canonical: "https://emploisdubai.com/services",
  },
  openGraph: {
    title: "Secteurs d'Emplois qui Recrutent à Dubaï | Emplois Dubaï",
    description:
      "Chauffeurs VIP, Hôtellerie Luxe, Sécurité, BTP et Santé. Découvrez les opportunités de travail disponibles à Dubaï.",
    url: "https://emploisdubai.com/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesCarousel />
    </>
  );
}


