import { Metadata } from "next";
import Link from "next/link";
import { 
  FAQSchema, 
  JobPostingSchema, 
  BreadcrumbSchema,
  LocalBusinessSchema,
  HowToSchema
} from "@/components/SchemaMarkup";

// Métadonnées ultra-optimisées
export const metadata: Metadata = {
  title: "Serveur à Dubaï 2026 | Salaire 8000 AED + Logement Partenaire | Recrutement",
  description: "✅ Opportunités de serveur/serveuse à Dubaï ✅ Salaire jusqu'à 8000 AED + tips ✅ Options de logement via partenaires ✅ Recrutement international ✅ Accompagnement",
  keywords: [
    "emploi serveur Dubaï",
    "recrutement serveur Dubaï 2026",
    "salaire serveur Dubaï",
    "serveur restaurant luxe Dubaï",
    "travailler restauration Dubaï",
    "serveuse Dubaï étranger",
    "visa travail serveur Dubaï",
    "recrutement hôtellerie Dubaï",
    "emploi restauration Dubaï français",
    "serveur francophone Dubaï"
  ].join(", "),
  openGraph: {
    title: "Serveur à Dubaï | Salaire jusqu'à 8000 AED + Options de Logement",
    description: "Mise en relation internationale pour les restaurants et hôtels partenaires de Dubaï. Opportunités ciblées et accompagnement.",
    type: "website",
    locale: "fr_FR",
    siteName: "Emplois Dubaï",
  },
  twitter: {
    card: "summary_large_image",
    title: "Serveur à Dubaï 2026 | Salaire 8000 AED + Logement",
    description: "Postulez gratuitement pour travailler à Dubaï.",
  },
  alternates: {
    canonical: "https://emploisdubai.com/guides/emploi-serveur-dubai",
    languages: {
      'fr': "https://emploisdubai.com/guides/emploi-serveur-dubai",
      'fr-FR': "https://emploisdubai.com/guides/emploi-serveur-dubai",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "emploi",
  classification: "recrutement international",
  authors: [{ name: "Emplois Dubaï", url: "https://emploisdubai.com/about" }],
  publisher: "Emplois Dubaï",
};

export default function ServeurDubaiPage() {
  // Données enrichies pour les schémas
  const jobPostingData = {
    title: "Serveur / Serveuse en Restauration Haut de Gamme",
    salary: "5000-8000 AED",
    salaryMin: 5000,
    salaryMax: 8000,
    salaryCurrency: "AED",
    employmentType: "FULL_TIME",
    hiringOrganization: "Emplois Dubaï",
    jobLocation: "Dubaï, Émirats Arabes Unis",
    validThrough: "2026-12-31",
    description: "Recrutement de serveurs expérimentés pour restaurants étoilés et hôtels de luxe à Dubaï.",
    qualifications: ["Expérience 1-2 ans min", "Anglais courant", "Présentation soignée"],
    benefits: ["Options de logement via partenaires", "Transport selon employeur", "Repas sur place", "Assurance santé", "Billet avion"],
  };

  const faqData = [
    {
      question: "Quel est le vrai salaire d'un serveur à Dubaï en 2026 ?",
      answer: "Le salaire de base varie entre 3000 et 5000 AED (750-1250€). Avec les pourboires (tips) et frais de service, le total peut atteindre 6000-8000 AED (1500-2000€) par mois, totalement défiscalisé. Dans les restaurants étoilés, les meilleurs serveurs gagnent jusqu'à 10 000 AED mensuels.",
      upvotes: 47
    },
    {
      question: "Puis-je travailler comme serveur à Dubaï sans expérience ?",
      answer: "Oui, mais les meilleurs salaires sont pour les profils expérimentés (min 1-2 ans). Les débutants commencent comme commis de salle ou runner avec un salaire de 2500-3500 AED. Nos partenaires peuvent proposer des formations pour les profils motivés.",
      upvotes: 32
    },
    {
      question: "Est-ce que l'employeur paie le visa et le logement ?",
      answer: "OUI - La loi émiratie oblige l'employeur à fournir le visa de travail (3000-5000 AED de frais), l'assurance santé complète, et soit le logement soit une indemnité de logement de 1000-2000 AED/mois.",
      upvotes: 89
    },
    {
      question: "Quand est la meilleure période pour postuler ?",
      answer: "Les meilleures périodes : Septembre à Novembre (avant haute saison), Janvier à Mars (après les soldes d'été). Évitez Juin-Août (chaleur extrême, sauf hôtels climatisés).",
      upvotes: 28
    },
    {
      question: "Combien de temps pour obtenir le visa travail ?",
      answer: "Délai total : 3-4 semaines. Détail : Offre d'emploi (1 sem), Visa entrée (2 sem), Arrivée Dubaï + visites médicales (3-5 jours), Emirates ID (1-2 sem). Nous facilitons la mise en relation avec nos partenaires.",
      upvotes: 56
    }
  ];

  return (
    <>
      {/* Tous les schémas JSON-LD */}
      <BreadcrumbSchema
        items={[
          { name: "Accueil", item: "https://emploisdubai.com/" },
          { name: "Guides", item: "https://emploisdubai.com/guides" },
          { name: "Serveur Dubaï", item: "https://emploisdubai.com/guides/emploi-serveur-dubai" },
        ]}
      />
      <LocalBusinessSchema />
      <HowToSchema />
      <FAQSchema data={faqData} />
      <JobPostingSchema data={jobPostingData} />
      
      <div className="min-h-screen bg-gradient-to-b from-brand-black via-zinc-900 to-brand-black text-white">
        
        {/* Barre de progression de lecture (SEO + UX) */}
        <ReadingProgressBar />
        
        <main className="pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-20">
            
            {/* Trust badges en haut */}
            <div className="mb-8">
              <TrustBadges />
            </div>

            {/* Badges de confiance */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center gap-2 bg-brand-gold/20 text-brand-gold px-4 py-1 rounded-full text-sm font-semibold">
                ⚡ Mise en relation rapide
              </span>
            </div>

            {/* Titre H1 */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Serveur à Dubaï 2026
              <span className="text-brand-gold block text-2xl md:text-3xl mt-3">
                🔥 Salaire attractif selon expérience
              </span>
            </h1>

            {/* Sous-titre SEO-friendly */}
            <p className="text-xl text-zinc-300 mb-8 max-w-3xl">
              Découvrez les <strong className="text-brand-gold">opportunités de serveur à Dubaï</strong> avec options de logement et visa qui peuvent être gérés par les employeurs partenaires. 
              Mise en relation pour la saison 2026.
            </p>

            {/* CTA sticky amélioré */}
            <StickyCTA />

            {/* Contenu principal avec structure améliorée */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
              {/* Colonne principale (70% du contenu) */}
              <div className="lg:col-span-2">
                <div className="prose prose-invert prose-gold max-w-none">
                  
                  {/* Calculateur de salaire interactif */}
                  <SalaryCalculatorWidget />
                  
                  {/* Tableau salaire détaillé avec comparaison */}
                  <SalaryComparisonTable />
                  
                  {/* Avantages liste détaillée */}
                  <BenefitsDetailedList />
                  
                  {/* Processus visa avec timeline */}
                  <VisaTimeline />
                  

                  {/* FAQ enrichie avec votes */}
                  <EnhancedFAQ faqData={faqData} />
                  
                  {/* CTA contextuel au milieu */}
                  <MidPageCTA />
                  
                  {/* Conseils entretien */}
                  <InterviewTips />
                  
                  {/* Articles liés pour maillage interne */}
                  <RelatedArticles />
                  
                </div>
              </div>

              {/* Colonne latérale (30% - sticky sidebar) */}
              <div className="lg:col-span-1">
                <div className="sticky top-32 space-y-8">
                  
                  {/* Formulaire alerte emploi */}
                  <JobAlertForm jobType="serveur" />
                  
                  {/* Top employeurs */}
                  <TopEmployers />
                  
                  {/* Dernières offres */}
                  <RecentJobs />
                  
                  {/* Badges certification */}
                  <CertificationBadges />
                  
                  {/* Widget partage social */}
                  <SocialShareWidget />
                  
                </div>
              </div>
            </div>

            {/* CTA final massif */}
            <FinalCTA />
          </div>
        </main>


        {/* Popup sortie (exit intent) */}
        <ExitIntentPopup />
      </div>
    </>
  );
}

// Composants supplémentaires

function ReadingProgressBar() {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-zinc-800 z-50">
      <div
        className="h-full bg-brand-gold transition-all duration-300"
        style={{ width: "35%" }}
      />
    </div>
  );
}

function StickyCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden animate-in slide-in-from-right-5">
      <Link
        href="/candidature"
        className="flex items-center gap-2 bg-brand-gold text-brand-black px-6 py-3 rounded-full font-bold shadow-2xl hover:scale-105 transition-transform"
      >
        <span className="text-xl">📋</span>
        Postuler maintenant
        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">Urgent</span>
      </Link>
    </div>
  );
}

function AnimatedStats({ stats }: { stats: any }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-12">
      <div className="bg-gradient-to-br from-brand-gold/20 to-transparent p-4 rounded-lg text-center border border-brand-gold/20">
        <div className="text-3xl font-bold text-brand-gold animate-countUp">{stats.totalJobs}+</div>
        <div className="text-xs text-zinc-400 mt-1">Offres disponibles</div>
      </div>
      <div className="bg-gradient-to-br from-brand-gold/20 to-transparent p-4 rounded-lg text-center border border-brand-gold/20">
        <div className="text-3xl font-bold text-brand-gold">{stats.avgSalary}+</div>
        <div className="text-xs text-zinc-400 mt-1">AED/mois moyens</div>
      </div>
      <div className="bg-gradient-to-br from-brand-gold/20 to-transparent p-4 rounded-lg text-center border border-brand-gold/20">
        <div className="text-3xl font-bold text-brand-gold">{stats.placementRate}%</div>
        <div className="text-xs text-zinc-400 mt-1">Taux de placement</div>
      </div>
      <div className="bg-gradient-to-br from-brand-gold/20 to-transparent p-4 rounded-lg text-center border border-brand-gold/20">
        <div className="text-3xl font-bold text-brand-gold">{stats.avgTimeToHire}</div>
        <div className="text-xs text-zinc-400 mt-1">Jours pour être placé</div>
      </div>
    </div>
  );
}

function SalaryCalculatorWidget() {
  return (
    <div className="bg-gradient-to-r from-zinc-900 to-brand-black p-6 rounded-xl my-8 border border-brand-gold/30">
      <h3 className="text-xl font-bold mb-4">💸 Simulez votre salaire net</h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-zinc-400">Salaire de base (AED)</label>
          <input type="range" min="3000" max="8000" step="500" className="w-full" />
        </div>
        <div>
          <label className="text-sm text-zinc-400">Pourboires estimés (AED)</label>
          <input type="range" min="1000" max="4000" step="500" className="w-full" />
        </div>
        <div className="bg-brand-gold/10 p-4 rounded-lg">
          <div className="text-sm text-zinc-400">Total mensuel estimé</div>
          <div className="text-3xl font-bold text-brand-gold">6 500 AED</div>
          <div className="text-xs text-zinc-500">≈ 1 625 € (défiscalisé)</div>
        </div>
      </div>
    </div>
  );
}

function ExitIntentPopup() {
  return null;
}

function TrustBadges() {
  return (
    <div className="flex flex-wrap gap-3">
      {["Recruteurs vérifiés", "Options de logement partenaires", "Opportunités ciblées", "Suivi personnalisé"].map((badge) => (
        <span key={badge} className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
          {badge}
        </span>
      ))}
    </div>
  );
}

function JobAlertForm({ jobType }: { jobType: string }) {
  return (
    <div className="bg-zinc-950/80 p-6 rounded-3xl border border-white/10">
      <h3 className="text-xl font-semibold mb-4">Alerte emploi {jobType}</h3>
      <p className="text-sm text-zinc-400 mb-4">
        Recevez les nouvelles offres de serveur à Dubaï directement par email.
      </p>
      <Link
        href="/candidature"
        className="block w-full text-center rounded-xl bg-brand-gold px-4 py-3 font-semibold text-brand-black"
      >
        S'inscrire aux alertes
      </Link>
    </div>
  );
}

function SalaryComparisonTable() {
  return (
    <div className="bg-zinc-950/80 rounded-3xl border border-white/10 p-6 mb-8">
      <h3 className="text-xl font-bold mb-4">Comparaison de salaire</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Débutant", value: "3 000 AED" },
          { label: "Confirmé", value: "5 500 AED" },
          { label: "Top profil", value: "8 000 AED" },
        ].map((item) => (
          <div key={item.label} className="rounded-3xl bg-white/5 p-4">
            <p className="text-sm text-zinc-400">{item.label}</p>
            <p className="mt-3 text-2xl font-semibold text-brand-gold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BenefitsDetailedList() {
  return (
    <div className="bg-zinc-950/80 rounded-3xl border border-white/10 p-6 mb-8">
      <h3 className="text-xl font-bold mb-4">Avantages clés</h3>
      <ul className="space-y-3 text-sm text-zinc-300">
        <li>• Logement et transport peuvent être proposés par l'employeur selon le poste</li>
        <li>• Salaire net défiscalisé jusqu'à 8 000 AED</li>
        <li>• Formations possibles via nos partenaires pour les profils motivés</li>
        <li>• Assistance visa et arrivée Dubaï</li>
      </ul>
    </div>
  );
}

function VisaTimeline() {
  return (
    <div className="bg-zinc-950/80 rounded-3xl border border-white/10 p-6 mb-8">
      <h3 className="text-xl font-bold mb-4">Étapes du visa</h3>
      <ol className="space-y-4 text-sm text-zinc-300 list-decimal list-inside">
        <li>Offre d'emploi validée</li>
        <li>Visa d'entrée et billet d'avion</li>
        <li>Examen médical à Dubaï</li>
        <li>Emirates ID et contrat signé</li>
      </ol>
    </div>
  );
}

function EnhancedFAQ({ faqData }: { faqData: Array<{ question: string; answer: string; upvotes?: number }> }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Questions fréquentes</h2>
      {faqData.map((item) => (
        <div key={item.question} className="rounded-3xl border border-white/10 bg-zinc-950/80 p-5">
          <p className="font-semibold text-white">{item.question}</p>
          <p className="mt-2 text-sm text-zinc-300">{item.answer}</p>
        </div>
      ))}
    </div>
  );
}

function MidPageCTA() {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-brand-gold/10 to-zinc-900 p-8 text-center mb-8">
      <h3 className="text-2xl font-bold mb-3">Postulez avant la fin du mois</h3>
      <p className="text-sm text-zinc-300 mb-5">Nos derniers postes de serveur à Dubaï sont réservés aux candidats rapides et motivés.</p>
      <Link href="/candidature" className="inline-flex items-center justify-center rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-black">
        Je postule maintenant
      </Link>
    </div>
  );
}

function InterviewTips() {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 mb-8">
      <h3 className="text-xl font-bold mb-4">Conseils entretien</h3>
      <ul className="space-y-3 text-sm text-zinc-300">
        <li>• Mettez en avant votre expérience en service haut de gamme.</li>
        <li>• Parlez de votre anglais opérationnel.</li>
        <li>• Soyez ponctuel et présentable.</li>
        <li>• Préparez des exemples de gestion de clients exigeants.</li>
      </ul>
    </div>
  );
}

function RelatedArticles() {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 mb-8">
      <h3 className="text-xl font-bold mb-4">Articles liés</h3>
      <ul className="space-y-3 text-sm text-zinc-300">
        <li><Link href="/guides/visa-travail-dubai" className="text-brand-gold hover:underline">Visa travail Dubaï : démarches et délais</Link></li>
        <li><Link href="/guides/emploi-serveur-dubai" className="text-brand-gold hover:underline">Serveur à Dubaï : conditions et salaire</Link></li>
      </ul>
    </div>
  );
}

function TopEmployers() {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6">
      <h3 className="text-xl font-bold mb-4">Employeurs partenaires</h3>
      <ul className="space-y-3 text-sm text-zinc-300">
        <li>• Burj Al Arab</li>
        <li>• Atlantis The Palm</li>
        <li>• Four Seasons Resort</li>
      </ul>
    </div>
  );
}

function RecentJobs() {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6">
      <h3 className="text-xl font-bold mb-4">Dernières offres</h3>
      <ul className="space-y-3 text-sm text-zinc-300">
        <li>Serveur restaurant gastronomique — Dubaï Marina</li>
        <li>Chef de rang hôtel 5★ — Downtown Dubaï</li>
        <li>Serveuse lounge VIP — Palm Jumeirah</li>
      </ul>
    </div>
  );
}

function CertificationBadges() {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6">
      <h3 className="text-xl font-bold mb-4">Certifications</h3>
      <div className="space-y-3 text-sm text-zinc-300">
        <p>✔ Partenaire officiel de mise en relation</p>
        <p>✔ Démarches visa gérées par l&apos;employeur</p>
        <p>✔ Suivi personnalisé</p>
      </div>
    </div>
  );
}

function SocialShareWidget() {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6">
      <h3 className="text-xl font-bold mb-4">Partagez cette page</h3>
      <div className="flex flex-wrap gap-3">
        {[
          { label: "WhatsApp", href: "https://wa.me/?text=Découvrez+ce+poste+de+serveur+à+Dubaï" },
          { label: "Facebook", href: "https://www.facebook.com/sharer/sharer.php?u=https://emplois-dubai.com/guides/emploi-serveur-dubai" },
        ].map((item) => (
          <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10">
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function FinalCTA() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-brand-gold/10 to-zinc-950 p-10 text-center mt-10">
      <h2 className="text-3xl font-bold mb-4">Prêt à commencer votre carrière à Dubaï ?</h2>
      <p className="text-sm text-zinc-300 mb-6">Postulez aujourd'hui pour être mis en relation avec nos partenaires locaux.</p>
      <Link href="/candidature" className="inline-flex items-center justify-center rounded-full bg-brand-gold px-8 py-4 font-semibold text-brand-black">
        Postuler maintenant
      </Link>
    </section>
  );
}
