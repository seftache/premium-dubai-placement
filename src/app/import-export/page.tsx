import type { Metadata } from "next";
import { ImportExportContent } from "@/components/ImportExportContent";

export const metadata: Metadata = {
  title: "Emplois Import-Export & Logistique à Dubaï | Seftache Trading & Logistics",
  description:
    "Opportunités de travail et recrutement en Import-Export & Logistique à Dubaï. Fret, achat de véhicules, commerce de gros et douane depuis les Émirats.",
  keywords: [
    "emploi import export dubaï",
    "recrutement logistique dubaï",
    "fret maritime dubaï",
    "import export véhicule dubaï",
    "commerce dubaï afrique",
    "emplois dubaï",
  ],
  alternates: {
    canonical: "https://emploisdubai.com/import-export",
  },
  openGraph: {
    title: "Emplois Import-Export & Logistique à Dubaï | Emplois Dubaï",
    description:
      "Trouvez un travail dans le commerce international, la logistique et l'import-export aux Émirats Arabes Unis.",
    url: "https://emploisdubai.com/import-export",
  },
};

export default function ImportExportPage() {
  return <ImportExportContent />;
}

