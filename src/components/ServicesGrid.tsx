"use client";

import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

/* ============================================
   TYPES & INTERFACES
   ============================================ */
interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  positions: string;
  salary: string;
  category?: string;
}

interface ServiceStats {
  totalPositions: number;
  uniqueCategories: number;
  averageSalaryRange: {
    min: number;
    max: number;
  };
}

/* ============================================
   CONSTANTS & CONFIGURATION
   ============================================ */
const ANIMATION_CONFIG = {
  headerMargin: "-60px 0px",
  cardMargin: "-50px 0px",
  ctaMargin: "-40px",
  easeOut: [0.25, 0.46, 0.45, 0.94] as const,
} as const;

/* ============================================
   ICONS - Centralisés pour réutilisation
   ============================================ */
const ServiceIcons = {
  chauffeur: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  ),
  restauration: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.379a48.474 48.474 0 00-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
  ),
  securite: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  ),
  sante: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1a2.25 2.25 0 113.18-3.18l.72.72.72-.72a2.25 2.25 0 113.18 3.18l-5.1 5.1zM4.418 8.582a2.25 2.25 0 011.042-.607M15.983 8.582a2.25 2.25 0 00-1.042-.607M12 20.25v-7.5" />
  ),
  btp: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
  ),
  luxe: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  ),
  it: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
  ),
  commerce: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
  ),
};

// Helper pour créer une icône SVG standardisée
const createIcon = (pathData: React.ReactNode) => (
  <svg 
    className="h-7 w-7" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={1.2}
    aria-hidden="true"
  >
    {pathData}
  </svg>
);

/* ============================================
   DATA - Services disponibles
   ============================================ */
const SERVICES: ServiceItem[] = [
  {
    id: "chauffeurs",
    icon: createIcon(ServiceIcons.chauffeur),
    title: "Chauffeurs Privés",
    description: "Conducteurs VIP, chauffeurs de maître pour familles royales, services de limousine et flottes d'entreprise.",
    positions: "85+ postes actifs",
    salary: "8 000 – 15 000 AED/mois",
    category: "transport",
  },
  {
    id: "restauration",
    icon: createIcon(ServiceIcons.restauration),
    title: "Restauration & Hôtellerie",
    description: "Chefs cuisiniers, serveurs, maîtres d'hôtel, pâtissiers et personnels de salle pour hôtels 5 étoiles et restaurants gastronomiques.",
    positions: "120+ postes actifs",
    salary: "6 000 – 20 000 AED/mois",
    category: "hospitality",
  },
  {
    id: "securite",
    icon: createIcon(ServiceIcons.securite),
    title: "Sécurité & Surveillance",
    description: "Agents de sécurité, gardes du corps, responsables sûreté pour résidences privées, centres commerciaux et événements.",
    positions: "60+ postes actifs",
    salary: "7 000 – 18 000 AED/mois",
    category: "security",
  },
  {
    id: "sante",
    icon: createIcon(ServiceIcons.sante),
    title: "Santé & Médical",
    description: "Infirmiers, aides-soignants, techniciens de laboratoire et personnels paramédicaux pour cliniques et hôpitaux privés.",
    positions: "45+ postes actifs",
    salary: "10 000 – 25 000 AED/mois",
    category: "healthcare",
  },
  {
    id: "btp",
    icon: createIcon(ServiceIcons.btp),
    title: "BTP & Ingénierie",
    description: "Conducteurs de travaux, ingénieurs chantier, techniciens spécialisés et ouvriers qualifiés pour les mégaprojets de Dubaï.",
    positions: "95+ postes actifs",
    salary: "8 000 – 30 000 AED/mois",
    category: "construction",
  },
  {
    id: "luxe",
    icon: createIcon(ServiceIcons.luxe),
    title: "Luxe & Services Premium",
    description: "Concierges d'hôtel, gouvernantes, majordomes, nannies qualifiées et personnels de maison pour résidences ultra-luxe.",
    positions: "40+ postes actifs",
    salary: "9 000 – 22 000 AED/mois",
    category: "luxury",
  },
  {
    id: "it",
    icon: createIcon(ServiceIcons.it),
    title: "IT & Technologies",
    description: "Développeurs, administrateurs système, spécialistes cybersécurité et chefs de projet technique pour la tech-hub de la région.",
    positions: "70+ postes actifs",
    salary: "15 000 – 45 000 AED/mois",
    category: "technology",
  },
  {
    id: "commerce",
    icon: createIcon(ServiceIcons.commerce),
    title: "Commerce & Ventes",
    description: "Directeurs commerciaux, responsables export, account managers et business developers pour le marché du Golfe.",
    positions: "55+ postes actifs",
    salary: "12 000 – 35 000 AED/mois",
    category: "sales",
  },
];

/* ============================================
   UTILITAIRES
   ============================================ */

/**
 * Parse une chaîne de salaire pour extraire les valeurs min/max
 * Exemple: "8 000 – 15 000 AED/mois" => { min: 8000, max: 15000 }
 */
function parseSalary(salary: string): { min: number; max: number } | null {
  const match = salary.match(/(\d[\d\s]*)\s*[–-]\s*(\d[\d\s]*)/);
  if (!match) return null;
  
  return {
    min: parseInt(match[1].replace(/\s/g, ''), 10),
    max: parseInt(match[2].replace(/\s/g, ''), 10),
  };
}

/**
 * Calcule les statistiques globales des services
 */
function useServiceStats(): ServiceStats {
  return useMemo(() => {
    const totalPositions = SERVICES.reduce((sum, service) => {
      const match = service.positions.match(/(\d+)/);
      return sum + (match ? parseInt(match[1], 10) : 0);
    }, 0);

    const uniqueCategories = new Set(
      SERVICES.map(s => s.category).filter(Boolean)
    ).size;

    // Calcul de la moyenne des salaires
    let totalMin = 0, totalMax = 0, validCount = 0;
    SERVICES.forEach(service => {
      const parsed = parseSalary(service.salary);
      if (parsed) {
        totalMin += parsed.min;
        totalMax += parsed.max;
        validCount++;
      }
    });

    return {
      totalPositions,
      uniqueCategories,
      averageSalaryRange: {
        min: Math.round(totalMin / validCount),
        max: Math.round(totalMax / validCount),
      },
    };
  }, []);
}

/* ============================================
   COMPOSANTS ENFANTS
   ============================================ */

/**
 * Carte de service individuelle avec animations
 */
function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: ANIMATION_CONFIG.cardMargin });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay: (index % 4) * 0.1,
        ease: ANIMATION_CONFIG.easeOut,
      }}
      className="group relative flex flex-col overflow-hidden border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:border-brand-gold/15 hover:bg-white/[0.04] sm:p-8"
      role="article"
      aria-labelledby={`service-title-${service.id}`}
    >
      {/* Effet de lueur au survol */}
      <div 
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-gold/[0.03] opacity-0 blur-[80px] transition-opacity duration-500 group-hover:opacity-100" 
        aria-hidden="true" 
      />

      {/* Icône dans un conteneur stylisé */}
      <div className="mb-5 flex h-12 w-12 items-center justify-center border border-brand-gold/15 bg-brand-gold/[0.05] text-brand-gold/70 transition-colors duration-300 group-hover:border-brand-gold/25 group-hover:text-brand-gold">
        {service.icon}
      </div>

      {/* Titre du service */}
      <h3 
        id={`service-title-${service.id}`}
        className="mb-3 font-serif text-lg font-semibold text-white sm:text-xl"
      >
        {service.title}
      </h3>

      {/* Description */}
      <p className="mb-6 flex-1 font-sans text-sm font-light leading-relaxed text-white/45">
        {service.description}
      </p>

      {/* Métadonnées : postes et salaire */}
      <div className="mt-auto flex flex-col gap-2 border-t border-white/[0.04] pt-5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-sans tracking-[0.15em] uppercase text-white/30">
            Postes disponibles
          </span>
          <span className="text-[11px] font-sans font-medium text-brand-gold/70">
            {service.positions}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-sans tracking-[0.15em] uppercase text-white/30">
            Rémunération
          </span>
          <span className="text-[11px] font-sans font-medium text-white/50">
            {service.salary}
          </span>
        </div>
      </div>

      {/* Ligne d'accent en bas au scroll */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.3 + (index % 4) * 0.1, 
          ease: "easeOut" 
        }}
        className="absolute bottom-0 left-0 h-[1px] w-full origin-left bg-gradient-to-r from-brand-gold/25 to-transparent"
        aria-hidden="true"
      />
    </motion.div>
  );
}

/**
 * En-tête de la section avec titre et description
 */
function ServicesHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: ANIMATION_CONFIG.headerMargin });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: ANIMATION_CONFIG.easeOut }}
      className="mb-16 text-center sm:mb-20"
    >
      {/* Badge */}
      <span className="mb-4 inline-block text-[11px] font-sans font-medium tracking-[0.3em] uppercase text-brand-gold/60">
        Nos domaines
      </span>

      {/* Titre principal */}
      <h1 className="mb-4 font-serif text-3xl font-semibold text-white sm:text-4xl md:text-5xl lg:text-6xl">
        Trouvez votre secteur{" "}
        <span className="text-gold-gradient">d&apos;excellence.</span>
      </h1>

      {/* Séparateur décoratif */}
      <div className="gold-separator mx-auto mt-6" aria-hidden="true" />

      {/* Description */}
      <p className="mx-auto mt-6 max-w-2xl font-sans text-sm font-light leading-relaxed text-white/40 md:text-base">
        Nous couvrons les secteurs les plus demandés à Dubaï et aux Émirats.
        Chaque domaine bénéficie d&apos;une équipe de recruteurs spécialisés et
        d&apos;un réseau d&apos;entreprises partenaires exclusif.
      </p>
    </motion.div>
  );
}

/**
 * Grille des services avec mise en page responsive
 */
function ServicesGridLayout() {
  return (
    <div 
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5"
      role="list"
      aria-label="Liste des secteurs de recrutement disponibles"
    >
      {SERVICES.map((service, index) => (
        <div key={service.id} role="listitem">
          <ServiceCard service={service} index={index} />
        </div>
      ))}
    </div>
  );
}

/**
 * Bannière de statistiques globales
 */
function StatsBanner({ stats }: { stats: ServiceStats }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mx-auto mt-10 max-w-3xl rounded-sm border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm sm:p-8"
      aria-label="Statistiques globales des services"
    >
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <span className="block font-serif text-2xl font-semibold text-brand-gold/80 sm:text-3xl">
            {stats.totalPositions}+
          </span>
          <span className="mt-1 block text-[10px] font-sans tracking-wider uppercase text-white/30">
            Postes au total
          </span>
        </div>
        <div>
          <span className="block font-serif text-2xl font-semibold text-brand-gold/80 sm:text-3xl">
            {stats.uniqueCategories}
          </span>
          <span className="mt-1 block text-[10px] font-sans tracking-wider uppercase text-white/30">
            Secteurs
          </span>
        </div>
        <div>
          <span className="block font-serif text-2xl font-semibold text-brand-gold/80 sm:text-3xl">
            {stats.averageSalaryRange.min.toLocaleString()}–{stats.averageSalaryRange.max.toLocaleString()}
          </span>
          <span className="mt-1 block text-[10px] font-sans tracking-wider uppercase text-white/30">
            Salaire moyen AED
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Section d'appel à l'action (CTA)
 */
function CTASection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: ANIMATION_CONFIG.ctaMargin }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-16 flex flex-col items-center text-center sm:mt-20"
    >
      <p className="mb-6 font-sans text-sm font-light text-white/35">
        Votre domaine n&apos;apparaît pas ? Contactez-nous — nous couvrons de nombreux autres secteurs.
      </p>
      <Link
        href="/candidature"
        className="group inline-flex items-center gap-3 border border-brand-gold bg-brand-gold px-8 py-4 text-sm font-sans font-semibold tracking-[0.15em] uppercase text-brand-black transition-all duration-300 hover:bg-brand-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black"
        aria-label="Accéder au formulaire de candidature"
      >
        Postuler maintenant
        <svg
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </motion.div>
  );
}

/* ============================================
   COMPOSANT PRINCIPAL
   ============================================ */

/**
 * Section présentant la grille complète des services de recrutement
 * avec statistiques et appel à l'action
 */
import Image from "next/image";

export function ServicesGrid() {
  const stats = useServiceStats();

  return (
    <section 
      className="relative min-h-screen overflow-hidden bg-brand-black pt-40 pb-24 sm:pt-48 sm:pb-32 md:pb-40"
      aria-labelledby="services-heading"
      id="services"
    >
      {/* Background Image with heavy overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-dubai.png"
          alt="Dubaï Services"
          fill
          priority
          quality={80}
          className="object-cover object-center opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black/95 to-brand-black" />
        <div className="absolute inset-0 bg-brand-black/80" />
      </div>

      {/* Ambient glows */}
      <div className="pointer-events-none absolute right-0 top-1/4 z-0 h-[400px] w-[400px] rounded-full bg-brand-gold/[0.015] blur-[150px]" aria-hidden="true" />
      <div className="pointer-events-none absolute left-0 bottom-1/3 z-0 h-[300px] w-[300px] rounded-full bg-brand-gold/[0.01] blur-[120px]" aria-hidden="true" />

      <div className="relative z-10 container-premium">
        {/* En-tête */}
        <ServicesHeader />

        {/* Bannière de statistiques */}
        <StatsBanner stats={stats} />

        {/* Grille des services */}
        <div className="mt-12 sm:mt-16">
          <ServicesGridLayout />
        </div>

        {/* Appel à l'action */}
        <CTASection />
      </div>
    </section>
  );
}