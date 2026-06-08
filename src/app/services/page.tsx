import type { Metadata } from "next";
import { ServicesCarousel } from "@/components/ServicesCarousel";

export const metadata: Metadata = {
  title: "Nos Secteurs d'Expertise | Emplois Dubaï",
  description:
    "Découvrez nos domaines de placement à Dubaï avec notre présentation immersive : chauffeurs privés, restauration, santé, et luxe.",
  openGraph: {
    title: "Nos Secteurs d'Expertise | Emplois Dubaï",
    description:
      "Découvrez nos domaines de placement immersifs à Dubaï.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesCarousel />
    </>
  );
}

