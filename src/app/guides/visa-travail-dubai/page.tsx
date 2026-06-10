import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Visa de Travail Dubaï (2026) | Procédure, Prix et Démarches",
  description: "Tout savoir sur le visa de travail à Dubaï pour les Africains et les Européens. Démarches, prix, sponsoring et comment obtenir son visa résident facilement.",
  keywords: ["visa travail dubai", "prix visa dubai", "comment obtenir visa dubai", "visa emploi dubai africain", "sponsoring visa uae"],
};

export default function VisaDubaiPage() {
  return (
    <div className="min-h-screen bg-brand-black text-white pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 sm:px-12 lg:px-20">
        <h1 className="text-3xl md:text-5xl font-bold text-brand-gold mb-8">Obtenir son Visa de Travail pour Dubaï en 2026</h1>
        
        <div className="prose prose-invert prose-gold max-w-none text-zinc-300 space-y-6">
          <p>
            L'obtention d'un visa de travail est l'étape la plus critique pour toute personne souhaitant s'installer aux Émirats Arabes Unis. Contrairement au visa touristique, le visa de travail (Employment Visa) vous donne le statut de résident légal, une carte d'identité émiratie (Emirates ID) et le droit d'ouvrir un compte bancaire.
          </p>
          
          <h2 className="text-2xl font-semibold text-white mt-10">Qui paie le Visa de Travail ?</h2>
          <p>
            Selon la loi du travail des Émirats Arabes Unis, <strong>c'est l'employeur (le sponsor) qui doit prendre en charge tous les frais liés au visa de travail</strong>. Les candidats ne devraient jamais payer directement le gouvernement pour leur visa emploi. Cependant, trouver un sponsor depuis l'étranger est extrêmement difficile.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10">La procédure étape par étape</h2>
          <ul className="list-decimal pl-6 space-y-2">
            <li><strong>L'Offre d'Emploi :</strong> Vous devez d'abord signer un contrat de travail officiel.</li>
            <li><strong>Le Visa d'Entrée (Pink Visa) :</strong> L'employeur demande un permis d'entrée valable 60 jours pour vous permettre de voyager vers Dubaï.</li>
            <li><strong>L'Examen Médical :</strong> Une fois à Dubaï, vous passerez un test médical (prise de sang et radio des poumons).</li>
            <li><strong>Emirates ID et Biométrie :</strong> Enregistrement de vos empreintes digitales pour la carte d'identité.</li>
            <li><strong>Tampon du Visa :</strong> Votre visa de résidence (valable 2 ans) est apposé sur votre passeport.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-10">Comment accélérer la démarche depuis l'Afrique ?</h2>
          <p>
            Pour les candidats venant d'Afrique (Côte d'Ivoire, Sénégal, Cameroun...), la recherche d'un sponsor de confiance est le plus grand obstacle. Chez <strong>Emplois Dubaï</strong>, nous avons structuré des packs premium (comme notre Pack Résident Platinum à 1 400 000 FCFA) qui vous garantissent une prise en charge totale : du recrutement à l'obtention de votre visa.
          </p>

          <div className="mt-12 p-8 bg-zinc-900/50 border border-brand-gold/20 rounded-lg text-center">
            <h3 className="text-xl font-bold text-white mb-4">Confiez-nous vos démarches d'immigration</h3>
            <p className="mb-6">Nous nous occupons de votre visa, de votre billet d'avion et de votre placement professionnel.</p>
            <Link href="/candidature" className="inline-block bg-brand-gold text-brand-black px-8 py-3 font-bold tracking-widest uppercase hover:bg-white transition-colors">
              Découvrir nos Packs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
