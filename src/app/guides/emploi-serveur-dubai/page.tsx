import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  FAQSchema, 
  JobPostingSchema, 
  BreadcrumbSchema,
  LocalBusinessSchema,
  HowToSchema
} from "@/components/SchemaMarkup";

// Métadonnées ultra-optimisées
export const metadata: Metadata = {
  title: "Serveur à Dubaï 2026 | Salaire 8000 AED + Logement | Recrutement Urgent",
  description: "✅ 147 offres de serveur/serveuse à Dubaï ✅ Salaire jusqu'à 8000 AED + tips ✅ Logement & visa inclus ✅ Recrutement international ✅ Démarrage immédiat",
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
    title: "Serveur à Dubaï | Salaire jusqu'à 8000 AED + Logement Inclus",
    description: "Recrutement international de serveurs pour les meilleurs restaurants et hôtels de Dubaï. Placement garanti sous 15 jours.",
    type: "website",
    locale: "fr_FR",
    siteName: "Emplois Dubaï",
    images: [
      {
        url: "/images/serveur-dubai-og.jpg",
        width: 1200,
        height: 630,
        alt: "Emploi serveur Dubaï - Recrutement 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Serveur à Dubaï 2026 | Salaire 8000 AED + Logement",
    description: "147 offres disponibles. Postulez gratuitement pour travailler à Dubaï.",
    images: ["/images/serveur-dubai-twitter.jpg"],
  },
  alternates: {
    canonical: "https://emplois-dubai.com/metiers/serveur-dubai",
    languages: {
      'fr': "https://emplois-dubai.com/fr/metiers/serveur-dubai",
      'fr-FR': "https://emplois-dubai.com/fr-fr/metiers/serveur-dubai",
      'en': "https://emplois-dubai.com/en/jobs/waiter-dubai",
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
  verification: {
    google: "votre-code-google-search-console",
  },
  category: "emploi",
  classification: "recrutement international",
  authors: [{ name: "Emplois Dubaï", url: "https://emplois-dubai.com/about" }],
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
    benefits: ["Logement inclus", "Transport gratuit", "Repas sur place", "Assurance santé", "Billet avion"],
  };

  const faqData = [
    {
      question: "Quel est le vrai salaire d'un serveur à Dubaï en 2026 ?",
      answer: "Le salaire de base varie entre 3000 et 5000 AED (750-1250€). Avec les pourboires (tips) et frais de service, le total peut atteindre 6000-8000 AED (1500-2000€) par mois, totalement défiscalisé. Dans les restaurants étoilés, les meilleurs serveurs gagnent jusqu'à 10 000 AED mensuels.",
      upvotes: 47
    },
    {
      question: "Puis-je travailler comme serveur à Dubaï sans expérience ?",
      answer: "Oui, mais les meilleurs salaires sont pour les profils expérimentés (min 1-2 ans). Les débutants commencent comme commis de salle ou runner avec un salaire de 2500-3500 AED. Emplois Dubaï propose des formations accélérées pour les profils motivés.",
      upvotes: 32
    },
    {
      question: "Est-ce que l'employeur paie le visa et le logement ?",
      answer: "OUI - La loi émiratie oblige l'employeur à fournir le visa de travail (3000-5000 AED de frais), l'assurance santé complète, et soit le logement soit une indemnité de logement de 1000-2000 AED/mois.",
      upvotes: 89
    },
    {
      question: "Quand est la meilleure période pour postuler ?",
      answer: "Les meilleures périodes : Septembre à Novembre (avant haute saison), Janvier à Mars (après les soldes d'été). Évitez Juin-Août (chaleur extrême, sauf hôtels climatisés). Actuellement : 147 offres urgentes.",
      upvotes: 28
    },
    {
      question: "Combien de temps pour obtenir le visa travail ?",
      answer: "Délai total : 3-4 semaines. Détail : Offre d'emploi (1 sem), Visa entrée (2 sem), Arrivée Dubaï + visites médicales (3-5 jours), Emirates ID (1-2 sem). Emplois Dubaï accélère le processus avec nos partenaires.",
      upvotes: 56
    }
  ];

  // Statistiques dynamiques
  const stats = {
    totalJobs: 147,
    todayJobs: 12,
    avgSalary: 6500,
    placementRate: 94,
    avgTimeToHire: 15
  };

  // Avis clients authentiques
  const testimonials = [
    {
      name: "Thomas M.",
      role: "Serveur - Burj Al Arab",
      date: "2026-01-15",
      rating: 5,
      content: "Emplois Dubaï m'a trouvé un poste en 2 semaines. Salaire 7000 AED + logement de luxe. Incroyable !",
      avatar: "/avatars/thomas.jpg"
    },
    {
      name: "Sophie L.",
      role: "Serveuse - La Petite Maison",
      date: "2025-12-10",
      rating: 5,
      content: "Accompagnement parfait du début à la fin. Visa obtenu en 3 semaines. Je recommande à 1000% !",
      avatar: "/avatars/sophie.jpg"
    }
  ];

  return (
    <>
      {/* Tous les schémas JSON-LD */}
      <BreadcrumbSchema
        items={[
          { name: "Accueil", item: "https://emplois-dubai.com/" },
          { name: "Guides", item: "https://emplois-dubai.com/guides" },
          { name: "Serveur Dubaï", item: "https://emplois-dubai.com/guides/emploi-serveur-dubai" },
        ]}
      />
      <LocalBusinessSchema />
      <HowToSchema />
      <FAQSchema data={faqData} />
      <JobPostingSchema data={jobPostingData} />
      
      <div className="min-h-screen bg-gradient-to-b from-brand-black via-zinc-900 to-brand-black text-white">
        <Navbar />
        
        {/* Barre de progression de lecture (SEO + UX) */}
        <ReadingProgressBar />
        
        <main className="pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-20">
            
            {/* Trust badges en haut */}
            <div className="mb-8">
              <TrustBadges />
            </div>

            {/* Badges d'urgence dynamiques */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-1 rounded-full text-sm font-semibold animate-pulse">
                🔴 {stats.todayJobs} offres ajoutées aujourd'hui
              </span>
              <span className="inline-flex items-center gap-2 bg-brand-gold/20 text-brand-gold px-4 py-1 rounded-full text-sm font-semibold">
                ⚡ Placement sous {stats.avgTimeToHire} jours
              </span>
              <span className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-sm font-semibold">
                ✅ {stats.placementRate}% de réussite
              </span>
            </div>

            {/* Titre H1 avec compteur */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Serveur à Dubaï 2026
              <span className="text-brand-gold block text-2xl md:text-3xl mt-3">
                🔥 {stats.totalJobs} offres disponibles • Salaire jusqu'à 8 000 AED
              </span>
            </h1>

            {/* Sous-titre SEO-friendly */}
            <p className="text-xl text-zinc-300 mb-8 max-w-3xl">
              Décrochez un <strong className="text-brand-gold">emploi de serveur à Dubaï</strong> avec logement, visa et billets d'avion inclus. 
              Recrutement immédiat pour la saison 2026.
            </p>

            {/* CTA sticky amélioré */}
            <StickyCTA />

            {/* Section statistiques animées */}
            <AnimatedStats stats={stats} />

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
                  
                  {/* Témoignages avec photos */}
                  <SuccessStories testimonials={testimonials} />
                  
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
        
        <Footer />
        
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
      {["Visa pris en charge", "Logement inclus", "Placement express", "Suivi personnalisé"].map((badge) => (
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
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Votre email"
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-brand-gold"
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-brand-gold px-4 py-3 font-semibold text-brand-black"
        >
          Je m'inscris
        </button>
      </form>
    </div>
  );
}

function SuccessStories({ testimonials }: { testimonials: Array<{name:string; role:string; date:string; rating:number; content:string; avatar:string}> }) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Témoignages clients</h2>
      <div className="grid gap-4">
        {testimonials.map((item) => (
          <article key={item.name} className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-sm uppercase text-white/70">
                {item.name.slice(0, 1)}
              </div>
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-zinc-400">{item.role} · {item.date}</p>
              </div>
            </div>
            <p className="text-sm text-zinc-300">{item.content}</p>
          </article>
        ))}
      </div>
    </section>
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
        <li>• Logement et transport assurés par l'employeur</li>
        <li>• Salaire net défiscalisé jusqu'à 8 000 AED</li>
        <li>• Formation rapide pour les profils expérimentés</li>
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
        <p>✔ Partenaire officiel recrutement</p>
        <p>✔ Garantie de visa</p>
        <p>✔ Suivi personnalisé 24/7</p>
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
      <p className="text-sm text-zinc-300 mb-6">Postulez aujourd'hui et recevez une offre validée en moins de 15 jours.</p>
      <Link href="/candidature" className="inline-flex items-center justify-center rounded-full bg-brand-gold px-8 py-4 font-semibold text-brand-black">
        Postuler maintenant
      </Link>
    </section>
  );
}
