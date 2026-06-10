import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import { JobPostingSchema, FAQSchema, BreadcrumbSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Trouver un emploi de Serveur à Dubaï (2026) | Salaires et Visa",
  description: "Guide complet pour trouver un travail de serveur ou serveuse à Dubaï. Découvrez les salaires, les conditions de logement, et comment obtenir votre visa de travail.",
  keywords: ["emploi serveur dubai", "travailler restauration dubai", "salaire serveur dubai", "visa travail restauration dubai", "serveuse dubai recrutement"],
};

export default function ServeurDubaiPage() {
  return (
    <>
      <BreadcrumbSchema 
        items={[
          { name: "Accueil", item: "https://emploisdubai.com" },
          { name: "Guides", item: "https://emploisdubai.com" },
          { name: "Emploi Serveur Dubaï", item: "https://emploisdubai.com/guides/emploi-serveur-dubai" }
        ]}
      />
      <JobPostingSchema 
        data={{
          title: "Serveur / Serveuse Premium - Hôtellerie de Luxe",
          description: "Recrutement de serveurs qualifiés pour les meilleurs restaurants et hôtels de Dubaï. Salaire attractif, logement fourni et visa sponsorisé.",
          salary: 4500,
          salaryCurrency: "AED"
        }} 
      />
      <FAQSchema 
        data={[
          {
            question: "Quel est le salaire d'un serveur à Dubaï ?",
            answer: "Un serveur débutant gagne entre 3 000 et 5 000 AED par mois, sans compter les pourboires qui peuvent doubler ce montant."
          },
          {
            question: "Qui paie le logement pour un serveur à Dubaï ?",
            answer: "La majorité des employeurs fournissent le logement dans des résidences pour employés, ainsi que le transport et la nourriture."
          }
        ]}
      />
      <div className="min-h-screen bg-brand-black text-white pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 sm:px-12 lg:px-20">
        <h1 className="text-3xl md:text-5xl font-bold text-brand-gold mb-8">Trouver un Emploi de Serveur à Dubaï en 2026</h1>
        
        <div className="prose prose-invert prose-gold max-w-none text-zinc-300 space-y-6">
          <p>
            L'industrie de la restauration et de l'hôtellerie de luxe à Dubaï est en pleine explosion. Avec des milliers de nouveaux hôtels et restaurants haut de gamme ouvrant chaque année, la demande pour des <strong>serveurs et serveuses qualifiés</strong> n'a jamais été aussi forte.
          </p>
          
          <h2 className="text-2xl font-semibold text-white mt-10">Quel est le salaire d'un serveur à Dubaï ?</h2>
          <p>
            Contrairement à l'Europe ou l'Afrique, le salaire à Dubaï est souvent divisé en deux parties : le salaire de base fixe, et les <em>tips</em> (pourboires) + frais de service.
            En moyenne, un serveur débutant gagne entre <strong>3 000 et 5 000 AED</strong> par mois (sans compter les pourboires qui peuvent doubler ce montant). Les postes dans la restauration de luxe (Fine Dining) offrent des rémunérations beaucoup plus élevées.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10">Les avantages en nature (Logement et Transport)</h2>
          <p>
            L'un des plus grands avantages de travailler à Dubaï est que la majorité des employeurs fournissent :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Le logement :</strong> Un appartement partagé ou individuel dans des résidences pour employés.</li>
            <li><strong>Le transport :</strong> Des navettes gratuites entre le logement et le lieu de travail.</li>
            <li><strong>Les repas :</strong> Un à deux repas par jour offerts pendant le service.</li>
            <li><strong>L'assurance santé :</strong> Couverture médicale complète obligatoire par la loi émiratie.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-10">Comment obtenir le Visa de Travail ?</h2>
          <p>
            Pour travailler légalement comme serveur à Dubaï, il vous faut un <em>Employment Visa</em> (Visa de travail). Ce visa est obligatoirement sponsorisé par votre employeur.
            C'est là que <strong>Emplois Dubaï</strong> intervient. Nous garantissons à nos candidats non seulement le placement dans les meilleurs établissements, mais aussi la prise en charge complète des démarches d'immigration.
          </p>

          <div className="mt-12 p-8 bg-zinc-900/50 border border-brand-gold/20 rounded-lg text-center">
            <h3 className="text-xl font-bold text-white mb-4">Prêt à lancer votre carrière à Dubaï ?</h3>
            <p className="mb-6">Découvrez notre pack premium incluant recrutement, visa, et billet d'avion.</p>
            <Link href="/candidature" className="inline-block bg-brand-gold text-brand-black px-8 py-3 font-bold tracking-widest uppercase hover:bg-white transition-colors">
              Postuler Maintenant
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
