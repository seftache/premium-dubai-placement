"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

/* ============================================
   TYPES & DATA STRUCTURES
   ============================================ */
interface Hotspot {
  id: string;
  top: string;
  left: string;
  label: string;
}

interface ServiceCardData {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  details: string[];
  hotspots: Hotspot[];
}

const SERVICES_DATA: ServiceCardData[] = [
  {
    id: "vehicules",
    title: "Véhicules & Engins",
    subtitle: "Achat & Expédition sécurisée",
    desc: "Sourcing direct en concession, inspection technique rigoureuse à Dubaï et acheminement maritime sécurisé (Ro-Ro ou conteneur) vers l'Afrique.",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    details: ["Achat direct concessions & en-can", "Rapports techniques certifiés", "Arrimage et fret maritime sécurisé"],
    hotspots: [
      { id: "v1", top: "30%", left: "25%", label: "Achat en concession & Négociation directe" },
      { id: "v2", top: "55%", left: "50%", label: "Rapport technique d'inspection complet avant achat" },
      { id: "v3", top: "75%", left: "75%", label: "Arrimage et sécurisation certifiés (Ro-Ro / FCL)" }
    ]
  },
  {
    id: "mode",
    title: "Mode & Prêt-à-porter",
    subtitle: "Sourcing & Groupage en volume",
    desc: "Accédez aux meilleurs grossistes de Dubaï pour le prêt-à-porter, chaussures et accessoires. Nous gérons le contrôle qualité et l'envoi express.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    details: ["Sourcing grossistes exclusifs", "Contrôle qualité rigoureux", "Colisage & Groupage optimisé"],
    hotspots: [
      { id: "m1", top: "20%", left: "30%", label: "Sourcing direct grossistes & Marques émiraties" },
      { id: "m2", top: "45%", left: "60%", label: "Contrôle qualité & Comptage précis des pièces" },
      { id: "m3", top: "70%", left: "40%", label: "Groupage & Emballage étanche anti-humidité" }
    ]
  },
  {
    id: "fret",
    title: "Logistique & Fret",
    subtitle: "Transit global & Douanes",
    desc: "Solutions de conteneurs complets (FCL), de groupage maritime (LCL) et de fret aérien quotidien. Prise en charge intégrale des formalités émiraties.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    details: ["Conteneurs FCL / LCL", "Fret aérien express quotidien", "Dédouanement export Dubaï"],
    hotspots: [
      { id: "l1", top: "35%", left: "35%", label: "Transit maritime direct & Fret aérien quotidien" },
      { id: "l2", top: "60%", left: "70%", label: "Dédouanement de sortie à Jebel Ali / DWC" },
      { id: "l3", top: "80%", left: "50%", label: "Remise sécurisée des documents d'importation" }
    ]
  }
];

interface Destination {
  id: string;
  name: string;
  coords: { x: number; y: number };
  pathQ: string;
  times: {
    maritime_roro: string;
    maritime_container: string;
    aerien: string;
  };
  details: string;
}

const DESTINATIONS: Destination[] = [
  {
    id: "dakar",
    name: "Sénégal (Dakar)",
    coords: { x: 40, y: 160 },
    pathQ: "M 300,80 Q 180,90 40,160",
    times: {
      maritime_roro: "18-22 jours",
      maritime_container: "20-25 jours",
      aerien: "3-4 jours"
    },
    details: "Ligne maritime directe depuis Jebel Ali vers le Port Autonome de Dakar. Vols quotidiens."
  },
  {
    id: "abidjan",
    name: "Côte d'Ivoire (Abidjan)",
    coords: { x: 85, y: 210 },
    pathQ: "M 300,80 Q 190,120 85,210",
    times: {
      maritime_roro: "20-24 jours",
      maritime_container: "22-26 jours",
      aerien: "3-5 jours"
    },
    details: "Expéditions régulières vers le Port Autonome d'Abidjan. Idéal pour marchandises diverses."
  },
  {
    id: "douala",
    name: "Cameroun (Douala)",
    coords: { x: 150, y: 220 },
    pathQ: "M 300,80 Q 210,130 150,220",
    times: {
      maritime_roro: "22-26 jours",
      maritime_container: "24-28 jours",
      aerien: "4-5 jours"
    },
    details: "Desserte continue du Port de Douala. Service d'inspection SGS géré en amont."
  },
  {
    id: "libreville",
    name: "Gabon (Libreville)",
    coords: { x: 150, y: 245 },
    pathQ: "M 300,80 Q 210,140 150,245",
    times: {
      maritime_roro: "24-28 jours",
      maritime_container: "26-30 jours",
      aerien: "4-5 jours"
    },
    details: "Livraisons au port d'Owendo à Libreville. Prise en charge des formalités douanières locales."
  },
  {
    id: "bamako",
    name: "Mali (Bamako)",
    coords: { x: 70, y: 175 },
    pathQ: "M 300,80 Q 190,100 70,175",
    times: {
      maritime_roro: "25-30 jours (via Dakar)",
      maritime_container: "28-34 jours (via Dakar)",
      aerien: "4-6 jours"
    },
    details: "Transport multimodal terrestre sécurisé depuis le port de Dakar ou Abidjan vers Bamako."
  },
  {
    id: "kinshasa",
    name: "RD Congo (Kinshasa)",
    coords: { x: 180, y: 275 },
    pathQ: "M 300,80 Q 220,150 180,275",
    times: {
      maritime_roro: "26-32 jours (via Matadi)",
      maritime_container: "28-35 jours (via Matadi)",
      aerien: "4-6 jours"
    },
    details: "Expédition maritime vers Matadi avec transit fluvial ou routier final sécurisé vers Kinshasa."
  }
];

const MODES = [
  { id: "maritime_roro", name: "Fret Maritime Ro-Ro", icon: "🚢", desc: "Idéal pour véhicules roulants" },
  { id: "maritime_container", name: "Conteneur FCL / LCL", icon: "📦", desc: "Pour marchandises & lots sécurisés" },
  { id: "aerien", name: "Fret Aérien Express", icon: "✈️", desc: "Recommandé pour mode & colis urgents" }
];

interface UniverseData {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  imageSrc: string;
  videoSrc?: string;
  videoId: string;
  link: string;
  category: string;
}

const UNIVERSES: UniverseData[] = [
  {
    id: "electronique",
    num: "01",
    title: "Électronique & High-Tech",
    subtitle: "Sourcing parcs informatiques & puces GPU",
    desc: "Ordinateurs de pointe, serveurs de calcul, puces graphiques IA et matériel technologique de dernière génération sourcés auprès de distributeurs agréés.",
    imageSrc: "/images/hightech.png",
    videoId: "R9K-H_vH4wM",
    link: "/import-export/electronique",
    category: "L'UNIVERS HIGH-TECH"
  },
  {
    id: "automobile",
    num: "02",
    title: "Hypercars & Vitesse",
    subtitle: "Concessions VIP & expéditions maritimes",
    desc: "Achat et transport sécurisé de supercars, véhicules de sport et SUV de luxe depuis les concessions émiraties de Jebel Ali et Ras Al Khor.",
    imageSrc: "/images/automobile.jpg",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-on-a-highway-41680-large.mp4",
    videoId: "kY-FhF3Kq_4",
    link: "/import-export/automobile",
    category: "L'UNIVERS AUTOMOBILE"
  },
  {
    id: "bijoux",
    num: "03",
    title: "Or & Joaillerie",
    subtitle: "Sourcing d'or pur & pierres précieuses",
    desc: "Exportation sécurisée de bijoux de luxe, lingots d'or certifiés et diamants sourcés directement depuis le Gold Souk de Dubaï.",
    imageSrc: "/images/bijoux.jpg",
    videoId: "vN8y9BRYRS8",
    link: "/import-export/bijoux",
    category: "L'UNIVERS JOAILLERIE"
  },
  {
    id: "fashion",
    num: "04",
    title: "Haute Couture & Éclat",
    subtitle: "Sourcing tissus nobles & prêt-à-porter de marque",
    desc: "Accès privilégié aux grossistes textiles émiratis. Contrôle qualité rigoureux et colisage étanche pour l'expédition de mode en gros.",
    imageSrc: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=80",
    videoId: "zp2RlWsgDo0",
    link: "/import-export/fashion",
    category: "L'UNIVERS MODE"
  },
  {
    id: "cafe",
    num: "05",
    title: "Café de Spécialité",
    subtitle: "Grains premium et torréfaction",
    desc: "Sourcing et exportation de grains de café vert d'exception et de mélanges torréfiés haut de gamme.",
    imageSrc: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=2000&q=80",
    videoId: "lAd3LYIZMjs",
    link: "/import-export/cafe",
    category: "L'UNIVERS CAFÉ"
  },
  {
    id: "meubles",
    num: "06",
    title: "Meubles & Décoration",
    subtitle: "Mobilier design et aménagement VIP",
    desc: "Exportation de meubles haut de gamme, d'œuvres d'art et d'éléments de décoration pour villas et hôtels de luxe.",
    imageSrc: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80",
    videoId: "OsPjZjwqwNQ",
    link: "/import-export/meubles",
    category: "L'UNIVERS MOBILIER"
  },
  {
    id: "cosmetics",
    num: "07",
    title: "Parfums & Cosmétiques",
    subtitle: "Parfumerie de luxe et soins de beauté",
    desc: "Achat et exportation de parfums orientaux, cosmétiques de luxe et produits de soins directement depuis Dubaï.",
    imageSrc: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=2000&q=80",
    videoId: "vGIm8CPMvls",
    link: "/import-export/cosmetics",
    category: "L'UNIVERS COSMÉTIQUE"
  },
  {
    id: "nobles",
    num: "08",
    title: "Matériaux de Construction",
    subtitle: "Matériaux pour le bâtiment et finitions",
    desc: "Fourniture de matériaux de construction de première qualité : marbre, acier, ciment et finitions de luxe pour vos chantiers.",
    imageSrc: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80",
    videoId: "UbINVF7afGc",
    link: "/import-export/nobles",
    category: "L'UNIVERS CONSTRUCTION"
  },
  {
    id: "alimentation",
    num: "09",
    title: "Alimentation & Épices",
    subtitle: "Produits alimentaires et épices du monde",
    desc: "Exportation de dattes premium, de café, d'épices rares et de produits alimentaires secs du Moyen-Orient.",
    imageSrc: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=2000&q=80",
    videoId: "hRs54X4WC1M",
    link: "/import-export/alimentation",
    category: "L'UNIVERS ALIMENTAIRE"
  },
  {
    id: "energie",
    num: "10",
    title: "Énergie Solaire",
    subtitle: "Panneaux solaires et batteries",
    desc: "Sourcing de panneaux solaires, d'onduleurs et de batteries au lithium pour vos projets d'énergie renouvelable.",
    imageSrc: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2000&q=80",
    videoId: "UgV4UxPavIw",
    link: "/import-export/energie",
    category: "L'UNIVERS ÉNERGIE"
  }
];

/* ============================================
   MAGNETIC BUTTON COMPONENT
   ============================================ */
function MagneticButton({
  children,
  onClick,
  className = ""
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = clientX - centerX;
    const y = clientY - centerY;
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 120, damping: 15, mass: 0.1 }}
      className={`group relative inline-flex items-center gap-3.5 rounded-full bg-[#c9a96e] px-10 py-5 text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-zinc-950 transition-all duration-300 shadow-[0_0_35px_rgba(201,169,110,0.22)] hover:scale-[1.03] hover:shadow-[0_0_55px_rgba(201,169,110,0.45)] focus:outline-none cursor-pointer ${className}`}
    >
      {children}
    </motion.button>
  );
}

/* ============================================
   UNIVERSE PANEL COMPONENT
   ============================================ */
function UniversePanel({
  universe,
  index
}: {
  universe: UniverseData;
  index: number;
}) {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const opacityText = useTransform(scrollYProgress, [0.15, 0.45, 0.55, 0.85], [0, 1, 1, 0]);
  const scaleText = useTransform(scrollYProgress, [0.15, 0.45, 0.55, 0.85], [0.85, 1, 1, 0.85]);
  const yText = useTransform(scrollYProgress, [0.15, 0.45, 0.55, 0.85], [70, 0, 0, -70]);

  const handleClick = () => {
    router.push(universe.link);
  };

  return (
    <div
      ref={panelRef}
      className="relative h-screen w-full"
      style={{ zIndex: index * 10 + 10 }}
    >
      <div
        onClick={handleClick}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#fafafc] cursor-pointer group"
      >
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y: yBg }} className="absolute -inset-y-12 inset-x-0">
            {universe.videoSrc ? (
              <video
                src={universe.videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover brightness-[1.08] contrast-[0.98]"
                poster={universe.imageSrc}
              />
            ) : (
              <Image
                src={universe.imageSrc}
                alt={universe.title}
                fill
                className="object-cover brightness-[1.08] contrast-[0.98]"
                sizes="100vw"
                priority={index < 2}
              />
            )}
          </motion.div>
          <div className="absolute inset-0 bg-white/10" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/50 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white via-white/20 to-transparent" />
        </div>

        <motion.div
          style={{ opacity: opacityText, scale: scaleText, y: yText }}
          className="relative z-10 w-full max-w-4xl px-6 flex justify-center pointer-events-none"
        >
          <div className="bg-white/80 backdrop-blur-xl border border-zinc-200/60 rounded-[32px] p-10 sm:p-14 shadow-2xl shadow-zinc-200/30 text-center max-w-3xl w-full group-hover:shadow-[0_30px_80px_rgba(201,169,110,0.15)] transition-shadow duration-500">
            <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-[#b8860b] uppercase block mb-4">
              {universe.category} • {universe.num} / 10
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-950 mb-6 leading-tight">
              {universe.title}
            </h2>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent mx-auto mb-6" />
            <p className="font-sans text-sm sm:text-base text-zinc-700 leading-relaxed font-light mb-8 max-w-xl mx-auto">
              {universe.desc}
            </p>
            <span className="text-xs font-sans font-semibold text-[#b8860b] tracking-wider uppercase border border-[#c9a96e]/40 rounded-full px-6 py-2.5 bg-[#c9a96e]/5 group-hover:bg-[#c9a96e]/10 transition-colors duration-300">
              {universe.subtitle} ➔
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ============================================
   GOLD SEPARATOR (réutilisable)
   ============================================ */
function GoldSeparator({ className = "" }: { className?: string }) {
  return (
    <div className={`h-[2px] w-24 bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent ${className}`} />
  );
}

/* ============================================
   MAIN COMPONENT
   ============================================ */
export function ImportExportContent() {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const simulatorRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroBgScale = useTransform(heroScroll, [0, 1], [1, 1.15]);
  const heroBgOpacity = useTransform(heroScroll, [0, 0.8], [0.55, 0.25]);
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "50%"]);
  const heroTextOpacity = useTransform(heroScroll, [0, 0.75], [1, 0]);

  const { scrollYProgress: pageScroll } = useScroll();
  const trackingLineWidth1 = useTransform(pageScroll, [0.05, 0.45], ["0%", "100%"]);
  const trackingLineWidth2 = useTransform(pageScroll, [0.4, 0.85], ["0%", "100%"]);

  const [activeCargo, setActiveCargo] = useState<string>("vehicules");
  const [activeDest, setActiveDest] = useState<string>("dakar");
  const [activeMode, setActiveMode] = useState<string>("maritime_roro");

  const handleCargoChange = (cargoId: string) => {
    setActiveCargo(cargoId);
    if (cargoId === "vehicules") {
      setActiveMode("maritime_roro");
    } else if (cargoId === "mode") {
      setActiveMode("aerien");
    } else {
      setActiveMode("maritime_container");
    }
  };

  const currentDest = DESTINATIONS.find((d) => d.id === activeDest) || DESTINATIONS[0];
  const currentCargo = SERVICES_DATA.find((c) => c.id === activeCargo) || SERVICES_DATA[0];
  const currentMode = MODES.find((m) => m.id === activeMode) || MODES[0];

  const computedTime =
    activeMode === "maritime_roro"
      ? currentDest.times.maritime_roro
      : activeMode === "maritime_container"
      ? currentDest.times.maritime_container
      : currentDest.times.aerien;

  const formattedMsg = encodeURIComponent(
    `Bonjour Lou Trading & Logistics. J'ai effectué une simulation pour un projet d'importation depuis Dubaï :\n` +
      `- Cargaison : ${currentCargo.title}\n` +
      `- Mode d'expédition : ${currentMode.name}\n` +
      `- Destination : ${currentDest.name}\n` +
      `Pouvez-vous m'accompagner et m'envoyer un devis personnalisé ?`
  );
  const whatsappUrl = `https://wa.me/971526252539?text=${formattedMsg}`;

  const handleScrollToSimulator = () => {
    simulatorRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const titleText = "TOUT IMPORTER. SANS LIMITE.";
  const titleWords = titleText.split(" ");
  const wordContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };
  const wordChild = {
    hidden: { y: "110%", transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.8 } },
    visible: { y: "0%", transition: { ease: [0.16, 1, 0.3, 1], duration: 0.95 } },
  } as const;

  return (
    <div className="relative min-h-screen bg-[#fafafc] text-zinc-950 overflow-hidden selection:bg-[#c9a96e]/20 selection:text-zinc-900">
      
      {/* Background ambiance */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(201,169,110,0.08),rgba(250,250,252,0))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none opacity-40" />

      {/* ═══════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-[98vh] min-h-[720px] w-full flex items-center justify-center overflow-hidden z-10"
      >
        <motion.div
          style={{ scale: heroBgScale, opacity: heroBgOpacity }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <Image
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2000&q=80"
            alt="Port logistique global et conteneurs"
            fill
            className="object-cover object-center brightness-[1.08] contrast-[0.98]"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-white/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fafafc]/60 to-[#fafafc]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fafafc]/80 via-transparent to-[#fafafc]/10" />
        </motion.div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#c9a96e]/10 blur-[130px] rounded-full pointer-events-none" />

        <motion.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="relative z-10 text-center max-w-5xl mx-auto px-6 mt-12 flex flex-col items-center"
        >
          <motion.h1
            variants={wordContainer}
            initial="hidden"
            animate="visible"
            className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.95] mb-8 text-[#1d1d1f] flex flex-wrap justify-center gap-x-4 md:gap-x-6 overflow-hidden py-1"
          >
            {titleWords.map((word, idx) => (
              <span key={idx} className="relative block overflow-hidden pb-1 pr-1">
                <motion.span
                  variants={wordChild}
                  className="inline-block text-[#1d1d1f] font-medium"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 0.95, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="h-[2px] bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-base sm:text-lg md:text-xl font-light leading-relaxed text-zinc-700 max-w-2xl mx-auto mb-12"
          >
            Matériel technologique de pointe, véhicules de prestige, fret industriel ou logistique d&apos;urgence. Une infrastructure globale de transport connectant les Émirats arabes unis à l&apos;Afrique, en pleine lumière.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
          >
            <MagneticButton onClick={handleScrollToSimulator}>
              Estimer mon fret ➔
            </MagneticButton>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60 z-10 pointer-events-none">
          <span className="text-[9px] font-sans tracking-[0.3em] text-[#b8860b] uppercase">Explorer</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-[#b8860b] to-transparent"
          />
        </div>
      </section>

      {/* Dynamic Route Line 1 */}
      <div className="w-full max-w-[1400px] mx-auto px-6 relative h-[1px]">
        <motion.div
          style={{ width: trackingLineWidth1 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/40 to-transparent absolute inset-x-0"
        />
      </div>

      {/* ═══════════════════════════════════════════
          10 UNIVERSE STICKY PARALLAX STACK
          ═══════════════════════════════════════════ */}
      <section ref={bentoRef} className="relative z-20">
        <div className="relative">
          {UNIVERSES.map((uni, idx) => (
            <UniversePanel
              key={uni.id}
              universe={uni}
              index={idx}
            />
          ))}
        </div>
      </section>

      {/* Dynamic Route Line 2 */}
      <div className="w-full max-w-[1400px] mx-auto px-6 relative h-[1px]">
        <motion.div
          style={{ width: trackingLineWidth2 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/40 to-transparent absolute inset-x-0"
        />
      </div>

      {/* ═══════════════════════════════════════════
    SIMULATEUR INTERACTIF - DESIGN PREMIUM
    ═══════════════════════════════════════════ */}
<section
  ref={simulatorRef}
  id="simulator"
  style={{ 
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    marginRight: 'calc(-50vw + 50%)',
    position: 'relative',
    zIndex: 20,
    background: '#0a0a0b',
    overflow: 'hidden'
  }}
  className="py-28 sm:py-36"
>
  {/* Fond premium */}
  <div style={{
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(201,169,110,0.04) 0%, transparent 50%)',
    pointerEvents: 'none'
  }} />
  <div style={{
    position: 'absolute',
    inset: 0,
    backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
    backgroundSize: '80px 80px',
    pointerEvents: 'none'
  }} />

  <div className="max-w-[1200px] px-6 sm:px-8" style={{ margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 10 }}>
    
    {/* En-tête */}
    <div className="text-center mb-20">
      <div className="inline-flex items-center gap-4 mb-6">
        <div style={{ height: '1px', width: '32px', background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.5))' }} />
        <span className="text-[10px] font-sans font-bold tracking-[0.35em] uppercase" style={{ color: '#c9a96e' }}>
          Outil Interactif
        </span>
        <div style={{ height: '1px', width: '32px', background: 'linear-gradient(to left, transparent, rgba(201,169,110,0.5))' }} />
      </div>
      
      <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6">
        Estimez votre logistique
      </h2>
      
      <div className="flex items-center justify-center gap-3 mb-6">
        <div style={{ height: '1px', width: '40px', background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.4))' }} />
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c9a96e' }} />
        <div style={{ height: '1px', width: '40px', background: 'linear-gradient(to left, transparent, rgba(201,169,110,0.4))' }} />
      </div>
      
      <p className="font-sans text-sm sm:text-base font-light text-zinc-400 max-w-xl mx-auto leading-relaxed">
        Sélectionnez vos critères pour tracer le trajet idéal en temps réel et obtenir un devis personnalisé de notre cellule logistique.
      </p>
    </div>

    <div className="space-y-6 w-full">
      
      {/* CARTE SVG */}
      <div className="group relative rounded-3xl p-6 sm:p-8 h-[450px] sm:h-[520px] overflow-hidden transition-all duration-500" style={{ 
        background: 'rgba(20,20,22,0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        
        <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <svg
            viewBox="0 0 360 320"
            fill="none"
            className="w-full h-full max-w-[600px] max-h-[400px]"
          >
            {[
              [50,180], [80,200], [120,220], [150,240], [180,280],
              [120,270], [100,250], [140,190], [270,90], [285,85], [310,70]
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="2" fill="white" opacity="0.03" />
            ))}
            
            {DESTINATIONS.map((dest) => {
              const isSelected = dest.id === activeDest;
              return (
                <g key={dest.id}>
                  <path
                    d={dest.pathQ}
                    stroke={isSelected ? "#c9a96e" : "rgba(255,255,255,0.04)"}
                    strokeWidth={isSelected ? 2 : 1}
                    strokeDasharray={isSelected ? "none" : "4,4"}
                    className="transition-all duration-700"
                  />
                  {isSelected && (
                    <motion.path
                      d={dest.pathQ}
                      stroke="url(#goldGradient2)"
                      strokeWidth={3}
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </g>
              );
            })}

            <defs>
              <linearGradient id="goldGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#b8860b" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#c9a96e" stopOpacity="1" />
                <stop offset="100%" stopColor="#b8860b" stopOpacity="0.6" />
              </linearGradient>
            </defs>

            <g transform="translate(300, 80)">
              <circle r="14" fill="rgba(201,169,110,0.1)" className="animate-pulse" />
              <circle r="8" fill="rgba(201,169,110,0.2)" />
              <circle r="5" fill="#c9a96e" />
              <circle r="2" fill="white" />
              <text x="18" y="5" fill="#c9a96e" fontSize="8" fontFamily="sans-serif" fontWeight="bold" letterSpacing="0.1em" opacity="0.9">DUBAÏ</text>
            </g>

            {DESTINATIONS.map((dest) => {
              const isSelected = dest.id === activeDest;
              return (
                <g key={dest.id} transform={`translate(${dest.coords.x}, ${dest.coords.y})`}>
                  {isSelected ? (
                    <>
                      <circle r="16" fill="rgba(201,169,110,0.08)" className="animate-ping" />
                      <circle r="7" fill="#c9a96e" />
                      <circle r="2.5" fill="white" />
                      <text x="14" y="5" fill="#c9a96e" fontSize="8" fontFamily="sans-serif" fontWeight="bold" letterSpacing="0.1em">
                        {dest.name.split(" ")[0].toUpperCase()}
                      </text>
                    </>
                  ) : (
                    <>
                      <circle r="4" fill="rgba(255,255,255,0.08)" />
                      <text x="12" y="4" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="sans-serif" fontWeight="500">
                        {dest.name.split(" ")[0].toUpperCase()}
                      </text>
                    </>
                  )}
                </g>
              );
            })}

            {activeDest && (
              <g>
                <path id="active-transit-path-2" d={currentDest.pathQ} fill="none" stroke="none" />
                <g>
                  <circle r="8" fill="rgba(201,169,110,0.15)">
                    <animateMotion dur="6s" repeatCount="indefinite">
                      <mpath href="#active-transit-path-2" />
                    </animateMotion>
                  </circle>
                  <circle r="4" fill="#c9a96e">
                    <animateMotion dur="6s" repeatCount="indefinite">
                      <mpath href="#active-transit-path-2" />
                    </animateMotion>
                  </circle>
                </g>
              </g>
            )}
          </svg>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 px-6 py-4 flex items-center justify-between" style={{ 
          background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255,255,255,0.05)'
        }}>
          <span className="text-[9px] font-sans tracking-[0.2em] font-semibold text-zinc-500 uppercase">
            Lou Trading Route Optimization
          </span>
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[9px] font-sans text-emerald-400 font-bold tracking-wider uppercase">Ligne active</span>
          </div>
        </div>
      </div>

      {/* GRILLE DES SÉLECTEURS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        
        {[
          {
            icon: "📋",
            label: "1. Marchandise",
            items: SERVICES_DATA,
            active: activeCargo,
            onClick: handleCargoChange,
            getIcon: (srv: any) => srv.id === "vehicules" ? "🚗" : srv.id === "mode" ? "🛍️" : "📦"
          },
          {
            icon: "🌍",
            label: "2. Destination",
            items: DESTINATIONS,
            active: activeDest,
            onClick: (id: string) => setActiveDest(id),
            isGrid: true,
            getIcon: null as any
          },
          {
            icon: "🚢",
            label: "3. Transport",
            items: MODES,
            active: activeMode,
            onClick: (id: string) => setActiveMode(id),
            getIcon: (mode: any) => mode.icon
          }
        ].map((col, colIdx) => (
          <div key={colIdx} className="group rounded-2xl p-5 transition-all duration-300" style={{ 
            background: 'rgba(20,20,22,0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
          }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-base">{col.icon}</span>
              <label className="text-[9px] font-sans tracking-[0.25em] font-semibold text-zinc-400 uppercase">
                {col.label}
              </label>
            </div>
            <div className={col.isGrid ? 'grid grid-cols-2 gap-2' : 'space-y-2'}>
              {col.items.map((item: any) => {
                const isActive = col.isGrid ? item.id === col.active : item.id === col.active;
                return (
                  <button
                    key={item.id}
                    onClick={() => col.onClick(item.id)}
                    className={`w-full flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all duration-300 ${
                      isActive
                        ? ''
                        : ''
                    }`}
                    style={isActive ? {
                      borderColor: 'rgba(201,169,110,0.5)',
                      background: 'rgba(201,169,110,0.08)',
                      color: '#c9a96e',
                      boxShadow: '0 0 20px rgba(201,169,110,0.1)'
                    } : {
                      borderColor: 'rgba(255,255,255,0.05)',
                      background: 'rgba(255,255,255,0.02)',
                      color: '#a1a1aa'
                    }}
                  >
                    {col.getIcon && (
                      <span className="text-base flex-shrink-0">
                        {col.isGrid ? null : col.getIcon(item)}
                      </span>
                    )}
                    <div className="min-w-0 text-left">
                      <span className="block text-xs font-semibold truncate" style={{ color: isActive ? '#c9a96e' : '#e4e4e7' }}>
                        {item.name || item.title}
                      </span>
                      {item.subtitle && (
                        <span className="block text-[10px] font-light mt-0.5 truncate" style={{ color: isActive ? 'rgba(201,169,110,0.7)' : '#71717a' }}>
                          {item.subtitle}
                        </span>
                      )}
                      {item.desc && (
                        <span className="block text-[10px] font-light mt-0.5 truncate" style={{ color: isActive ? 'rgba(201,169,110,0.7)' : '#71717a' }}>
                          {item.desc}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

      </div>

      {/* RÉSULTAT SIMULATION */}
      <div className="rounded-2xl p-8 transition-all duration-300 w-full" style={{ 
        background: 'rgba(20,20,22,0.7)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
      }}>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full" style={{ 
              background: 'rgba(201,169,110,0.1)',
              border: '1px solid rgba(201,169,110,0.2)'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c9a96e' }} className="animate-pulse" />
              <span className="text-[9px] font-sans font-bold tracking-[0.2em] uppercase" style={{ color: '#c9a96e' }}>
                Résultats de simulation
              </span>
            </div>
            
            <h4 className="text-2xl font-serif font-bold text-white mb-3">
              Dubaï vers {currentDest.name}
            </h4>
            
            <p className="text-sm font-sans font-light text-zinc-400 leading-relaxed max-w-lg">
              {currentDest.details}
            </p>
            
            <div className="flex flex-wrap gap-3 mt-4">
              {['Assurance incluse', 'Suivi en temps réel'].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 text-[10px] font-sans font-medium px-3 py-1.5 rounded-full" style={{ 
                  color: '#a1a1aa',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}>
                  <svg className="w-3 h-3" style={{ color: '#10b981' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-6 min-w-[200px] md:border-l md:pl-8" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div>
              <span className="block text-[8px] font-sans tracking-widest text-zinc-500 uppercase mb-2">
                Transit estimé
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-serif font-bold" style={{ color: '#c9a96e' }}>{computedTime}</span>
              </div>
            </div>
            
            <div>
              <span className="block text-[8px] font-sans tracking-widest text-zinc-500 uppercase mb-2">
                Douanes export
              </span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.1)' }}>
                  <svg className="w-4 h-4" style={{ color: '#10b981' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-sans font-medium text-emerald-400">Totalement gérées</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bouton Devis */}
        <div className="mt-8 pt-6 flex justify-center md:justify-end" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-3.5 text-[11px] font-sans font-bold tracking-[0.15em] uppercase transition-all duration-500 hover:scale-[1.03]"
            style={{
              background: 'linear-gradient(135deg, #c9a96e 0%, #b8860b 50%, #c9a96e 100%)',
              color: '#0a0a0b',
              boxShadow: '0 4px 25px rgba(201,169,110,0.4)'
            }}
          >
            <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            <span className="relative z-10 flex items-center gap-3">
              Obtenir un devis
              <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
        </div>
      </div>

    </div>
  </div>
</section>

{/* ═══════════════════════════════════════════
    CTA BLOCK - Design Premium Dark
    ═══════════════════════════════════════════ */}
<section 
  style={{ 
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    marginRight: 'calc(-50vw + 50%)',
    position: 'relative',
    zIndex: 20,
    background: '#0a0a0b',
    overflow: 'hidden'
  }}
  className="py-24 sm:py-32"
>
  {/* Fond décoratif */}
  <div style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    height: '600px',
    background: 'radial-gradient(ellipse, rgba(201,169,110,0.06) 0%, transparent 70%)',
    pointerEvents: 'none'
  }} />
  <div style={{
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '600px',
    height: '1px',
    background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent)',
    pointerEvents: 'none'
  }} />
  
  <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-[40px] p-10 sm:p-16 text-center w-full"
      style={{ 
        background: 'rgba(20,20,22,0.7)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 30px 80px rgba(0,0,0,0.4)'
      }}
    >
      <div className="inline-flex items-center gap-4 mb-8">
        <div style={{ height: '1px', width: '32px', background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.5))' }} />
        <span className="text-[9px] font-sans font-bold tracking-[0.4em] uppercase" style={{ color: '#c9a96e' }}>
          Division Fret International
        </span>
        <div style={{ height: '1px', width: '32px', background: 'linear-gradient(to left, transparent, rgba(201,169,110,0.5))' }} />
      </div>
      
      <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white mb-8 leading-tight">
        Prêt à lancer votre projet&nbsp;?
      </h2>
      
      <div className="flex items-center justify-center gap-3 mb-8">
        <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.4))' }} />
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c9a96e' }} />
        <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to left, transparent, rgba(201,169,110,0.4))' }} />
      </div>
      
      <p className="font-sans text-sm sm:text-base font-light text-zinc-400 max-w-lg leading-relaxed" style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: '3rem' }}>
        Consultez un logisticien Lou Trading pour chiffrer précisément votre transport et recevoir une offre commerciale personnalisée en moins de 24h.
      </p>
      
      <div className="flex justify-center">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3.5 overflow-hidden rounded-full px-14 py-5 text-[11px] font-sans font-bold tracking-[0.2em] uppercase transition-all duration-500 hover:scale-[1.03]"
          style={{
            background: 'linear-gradient(135deg, #c9a96e 0%, #b8860b 50%, #c9a96e 100%)',
            color: '#0a0a0b',
            boxShadow: '0 8px 40px rgba(201,169,110,0.45)'
          }}
        >
          <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
          <span className="relative z-10 flex items-center gap-3.5">
            Contacter Lou
            <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </a>
      </div>
    </motion.div>
  </div>
</section>

<div className="h-16 sm:h-28 w-full" style={{ background: '#0a0a0b', position: 'relative', zIndex: 20 }} />

    </div>
  );
}