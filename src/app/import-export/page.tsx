import type { Metadata } from "next";
import { ImportExportContent } from "@/components/ImportExportContent";

export const metadata: Metadata = {
  title: "Importation & Fret depuis Dubaï | Lou Trading & Logistics",
  description:
    "Achat et expédition sécurisée de véhicules, prêt-à-porter en gros et logistique douanière depuis les Émirats vers l'Afrique.",
};

export default function ImportExportPage() {
  return <ImportExportContent />;
}
