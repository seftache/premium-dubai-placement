"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

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
    image: "/industrie.png",
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
    image: "/luxe.png",
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
    image: "/dubai-port-trading.png",
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
  pathQ: string; // Quadratic curve control points
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
  category: string;
}

const UNIVERSES: UniverseData[] = [
  {
    id: "electronique",
    num: "01",
    title: "Silicium & Intelligence",
    subtitle: "Sourcing parcs informatiques & puces GPU",
    desc: "Ordinateurs de pointe, serveurs de calcul, puces graphiques IA et matériel technologique de dernière génération sourcés auprès de distributeurs agréés.",
    imageSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80",
    category: "L'UNIVERS HIGH-TECH"
  },
  {
    id: "automobile",
    num: "02",
    title: "Hypercars & Vitesse",
    subtitle: "Concessions VIP & expéditions maritimes",
    desc: "Achat et transport sécurisé de supercars, véhicules de sport et SUV de luxe depuis les concessions émiraties de Jebel Ali et Ras Al Khor.",
    imageSrc: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2000&q=80",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-on-a-highway-41680-large.mp4",
    category: "L'UNIVERS AUTOMOBILE"
  },
  {
    id: "medical",
    num: "03",
    title: "Photonique & Santé",
    subtitle: "Dispositifs critiques & robots médicaux",
    desc: "Sourcing international de matériel d'imagerie clinique, robotique chirurgicale de pointe et consommables stérilisés aux normes européennes.",
    imageSrc: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=2000&q=80",
    category: "L'UNIVERS MÉDICAL"
  },
  {
    id: "fashion",
    num: "04",
    title: "Haute Couture & Éclat",
    subtitle: "Sourcing tissus nobles & prêt-à-porter de marque",
    desc: "Accès privilégié aux grossistes textiles émiratis. Contrôle qualité rigoureux et colisage étanche pour l'expédition de mode en gros.",
    imageSrc: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=80",
    category: "L'UNIVERS MODE"
  },
  {
    id: "rechange",
    num: "05",
    title: "Vélocité Mécanique",
    subtitle: "Moteurs & pièces critiques d'urgence",
    desc: "Transit aérien express de pièces détachées d'origine aéronautique, automobile et pour engins de chantier lourds afin de réduire vos arrêts techniques.",
    imageSrc: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=2000&q=80",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-mechanical-clockwork-gears-moving-41644-large.mp4",
    category: "L'UNIVERS MÉCANIQUE"
  },
  {
    id: "industrie",
    num: "06",
    title: "Robotique & Force",
    subtitle: "Turbines de puissance & lignes industrielles",
    desc: "Achat et logistique exceptionnelle de générateurs électriques lourds, transformateurs de puissance et bras d'usinage industriels automatisés.",
    imageSrc: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80",
    category: "L'UNIVERS INDUSTRIEL"
  },
  {
    id: "cosmetics",
    num: "07",
    title: "Alchimie & Beauté",
    subtitle: "Fragrances de luxe & soins esthétiques",
    desc: "Sourcing direct en laboratoire émirati et expédition express sécurisée de parfums nobles, soins dermatologiques et alchimies de beauté.",
    imageSrc: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=2000&q=80",
    category: "L'UNIVERS COSMÉTIQUE"
  },
  {
    id: "nobles",
    num: "08",
    title: "Structure & Matière",
    subtitle: "Marbres précieux & céramiques d'art",
    desc: "Importation en gros de marbres de Carrare, essences de bois d'ébénisterie et revêtements en grès cérame pour l'architecture résidentielle VIP.",
    imageSrc: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80",
    category: "L'UNIVERS ARCHITECTURE"
  },
  {
    id: "alimentation",
    num: "09",
    title: "Terroirs & Épices",
    subtitle: "Transit agroalimentaire à humidité contrôlée",
    desc: "Sourcing et expédition de café vert, épices rares et denrées alimentaires sèches. Traçabilité complète et emballage hermétique.",
    imageSrc: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=2000&q=80",
    category: "L'UNIVERS ALIMENTAIRE"
  },
  {
    id: "energie",
    num: "10",
    title: "Énergie & Hélios",
    subtitle: "Panneaux photovoltaïques & accumulateurs",
    desc: "Sourcing de systèmes solaires complets, onduleurs intelligents et cellules de stockage au lithium pour alimenter vos projets d'énergie durable.",
    imageSrc: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2000&q=80",
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
   UNIVERSE PANEL COMPONENT (AWWWARDS STACK)
   ============================================ */
function UniversePanel({
  universe,
  index
}: {
  universe: UniverseData;
  index: number;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"]
  });

  // Parallax Y shifts for background visual
  const yBg = useTransform(scrollYProgress, [0, 1], [-120, 120]);

  // Entrance, lock, and exit animations for text overlay card
  const opacityText = useTransform(scrollYProgress, [0.15, 0.45, 0.55, 0.85], [0, 1, 1, 0]);
  const scaleText = useTransform(scrollYProgress, [0.15, 0.45, 0.55, 0.85], [0.85, 1, 1, 0.85]);
  const yText = useTransform(scrollYProgress, [0.15, 0.45, 0.55, 0.85], [70, 0, 0, -70]);

  return (
    <div
      ref={panelRef}
      className="relative h-screen w-full"
      style={{ zIndex: index * 10 + 10 }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#fafafc]">
        {/* Background Visual Layer */}
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y: yBg }} className="absolute -inset-y-36 inset-x-0">
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
          {/* Glass layout overlays */}
          <div className="absolute inset-0 bg-white/10" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/50 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white via-white/20 to-transparent" />
        </div>

        {/* Text Container Card */}
        <motion.div
          style={{ opacity: opacityText, scale: scaleText, y: yText }}
          className="relative z-10 w-full max-w-4xl px-6 flex justify-center"
        >
          <div className="bg-white/80 backdrop-blur-xl border border-zinc-200/60 rounded-[32px] p-10 sm:p-14 shadow-2xl shadow-zinc-200/30 text-center max-w-3xl w-full">
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
            <span className="text-xs font-sans font-semibold text-[#b8860b] tracking-wider uppercase border border-[#c9a96e]/40 rounded-full px-6 py-2.5 bg-[#c9a96e]/5 hover:bg-[#c9a96e]/10 transition-colors duration-300">
              {universe.subtitle} ➔
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ============================================
   MAIN COMPONENT
   ============================================ */
export function ImportExportContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const simulatorRef = useRef<HTMLDivElement>(null);

  // Hero Scroll Parallax values
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroBgScale = useTransform(heroScroll, [0, 1], [1, 1.15]);
  const heroBgOpacity = useTransform(heroScroll, [0, 0.8], [0.55, 0.25]);
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "50%"]);
  const heroTextOpacity = useTransform(heroScroll, [0, 0.75], [1, 0]);

  // Page Scroll for Tracking Lines
  const { scrollYProgress: pageScroll } = useScroll();
  const trackingLineWidth1 = useTransform(pageScroll, [0.05, 0.45], ["0%", "100%"]);
  const trackingLineWidth2 = useTransform(pageScroll, [0.4, 0.85], ["0%", "100%"]);

  // Simulator States
  const [activeCargo, setActiveCargo] = useState<string>("vehicules");
  const [activeDest, setActiveDest] = useState<string>("dakar");
  const [activeMode, setActiveMode] = useState<string>("maritime_roro");

  // Auto-adjust default recommended shipping mode based on selected cargo
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

  // Retrieve current simulator data objects
  const currentDest = DESTINATIONS.find((d) => d.id === activeDest) || DESTINATIONS[0];
  const currentCargo = SERVICES_DATA.find((c) => c.id === activeCargo) || SERVICES_DATA[0];
  const currentMode = MODES.find((m) => m.id === activeMode) || MODES[0];

  // Dynamic transit time retrieval
  const computedTime =
    activeMode === "maritime_roro"
      ? currentDest.times.maritime_roro
      : activeMode === "maritime_container"
      ? currentDest.times.maritime_container
      : currentDest.times.aerien;

  // WhatsApp prefilled link
  const formattedMsg = encodeURIComponent(
    `Bonjour Lou Trading & Logistics. J'ai effectué une simulation pour un projet d'importation depuis Dubaï :\n` +
      `- Cargaison : ${currentCargo.title}\n` +
      `- Mode d'expédition : ${currentMode.name}\n` +
      `- Destination : ${currentDest.name}\n` +
      `Pouvez-vous m'accompagner et m'envoyer un devis personnalisé ?`
  );
  const whatsappUrl = `https://wa.me/971526252539?text=${formattedMsg}`;

  // Smooth scroll handler
  const handleScrollToSimulator = () => {
    simulatorRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Word-by-word reveal configurations
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
      
      {/* Background Grids & Vector Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(201,169,110,0.08),rgba(250,250,252,0))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none opacity-40" />

      {/* ──────────────────────────────────────────────────────────
          1. HERO SECTION ("The Global Pipeline") - LIGHT LUXURY
          ────────────────────────────────────────────────────────── */}
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
            alt="Port logistique global et conteneurs sous le soleil"
            fill
            className="object-cover object-center brightness-[1.08] contrast-[0.98]"
            sizes="100vw"
            priority
          />
          {/* Glass overlay filter & gradient transition to cream-white page background */}
          <div className="absolute inset-0 bg-white/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fafafc]/60 to-[#fafafc]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fafafc]/80 via-transparent to-[#fafafc]/10" />
        </motion.div>

        {/* Ambient Warm Golden Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#c9a96e]/10 blur-[130px] rounded-full pointer-events-none" />

        <motion.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="relative z-10 text-center max-w-5xl mx-auto px-6 mt-12 flex flex-col items-center"
        >
          {/* Gigantic dark H1 with word reveal mask */}
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

          {/* Luxury descriptive subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-base sm:text-lg md:text-xl font-light leading-relaxed text-zinc-700 max-w-2xl mx-auto mb-12"
          >
            Matériel technologique de pointe, véhicules de prestige, fret industriel ou logistique d&apos;urgence. Une infrastructure globale de transport connectant les Émirats arabes unis à l&apos;Afrique, en pleine lumière.
          </motion.p>

          {/* Magnetic CTA button */}
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

        {/* Scroll Indicator */}
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

      {/* ──────────────────────────────────────────────────────────
          2. THE 10-CARD STICKY PARALLAX STACK SHOWCASE (AWWWARDS)
          ────────────────────────────────────────────────────────── */}
      <section ref={bentoRef} className="relative z-20">

        {/* Stack wrapper */}
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

      {/* ──────────────────────────────────────────────────────────
          3. INTERACTIVE SIMULATOR (Polished Light-Theme)
          ────────────────────────────────────────────────────────── */}
      <section
        ref={simulatorRef}
        id="simulator"
        className="relative z-20 py-28 sm:py-36 px-6 bg-[#fafafc]"
      >
        <div className="max-w-[1300px] mx-auto">
          
          <div className="text-center mb-20">
            <span className="mb-4 inline-block text-[11px] font-sans font-semibold tracking-[0.3em] uppercase text-[#b8860b]">
              Outil Interactif
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-950 mb-6">
              Estimez votre logistique.
            </h2>
            <div className="gold-separator mx-auto mb-6" />
            <p className="font-sans text-sm sm:text-base font-light text-zinc-600 max-w-xl mx-auto">
              Sélectionnez vos critères pour tracer le trajet idéal en temps réel et obtenir un devis personnalisé de notre cellule logistique.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Input selectors */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Category Selector */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md shadow-zinc-100/50">
                <label className="text-[10px] font-sans tracking-[0.2em] font-semibold text-zinc-500 uppercase mb-4 block">
                  1. Type de Marchandise
                </label>
                <div className="flex flex-col gap-3">
                  {SERVICES_DATA.map((srv) => (
                    <button
                      key={srv.id}
                      onClick={() => handleCargoChange(srv.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                        activeCargo === srv.id
                          ? "border-[#c9a96e] bg-[#c9a96e]/5 text-[#b8860b]"
                          : "border-zinc-200 bg-zinc-50/50 text-zinc-800 hover:bg-zinc-100"
                      }`}
                    >
                      <div>
                        <span className="block text-sm font-semibold">{srv.title}</span>
                        <span className="block text-[11px] font-sans font-light text-zinc-500 mt-0.5">{srv.subtitle}</span>
                      </div>
                      <span className="text-lg">{srv.id === "vehicules" ? "🚗" : srv.id === "mode" ? "🛍️" : "📦"}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Destination Selector */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md shadow-zinc-100/50">
                <label className="text-[10px] font-sans tracking-[0.2em] font-semibold text-zinc-500 uppercase mb-4 block">
                  2. Destination en Afrique
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {DESTINATIONS.map((dest) => (
                    <button
                      key={dest.id}
                      onClick={() => setActiveDest(dest.id)}
                      className={`p-3 rounded-xl border text-center transition-all duration-300 text-xs font-semibold cursor-pointer ${
                        activeDest === dest.id
                          ? "border-[#c9a96e] bg-[#c9a96e]/5 text-[#b8860b]"
                          : "border-zinc-200 bg-zinc-50/50 text-zinc-600 hover:bg-zinc-100"
                      }`}
                    >
                      {dest.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode Selector */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md shadow-zinc-100/50">
                <label className="text-[10px] font-sans tracking-[0.2em] font-semibold text-zinc-500 uppercase mb-4 block">
                  3. Mode de Transport
                </label>
                <div className="flex flex-col gap-3">
                  {MODES.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setActiveMode(mode.id)}
                      className={`w-full flex items-center gap-4 p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                        activeMode === mode.id
                          ? "border-[#c9a96e] bg-[#c9a96e]/5 text-[#b8860b]"
                          : "border-zinc-200 bg-zinc-50/50 text-zinc-700 hover:bg-zinc-100"
                      }`}
                    >
                      <span className="text-xl">{mode.icon}</span>
                      <div>
                        <span className="block text-xs font-semibold">{mode.name}</span>
                        <span className="block text-[10px] font-sans font-light text-zinc-500 mt-0.5">{mode.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Visual Vector SVG Map & Results */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Map Card */}
              <div className="rounded-2xl border border-zinc-200 bg-zinc-100/40 p-6 flex flex-col justify-between relative overflow-hidden h-[340px] sm:h-[400px] shadow-inner">
                
                {/* World Map Background SVG */}
                <div className="absolute inset-0 z-0 flex items-center justify-center p-4">
                  <svg
                    viewBox="0 0 360 320"
                    fill="none"
                    className="w-full h-full object-contain max-h-[320px] opacity-90"
                  >
                    {/* Stylized Landmass grid dots */}
                    <circle cx="50" cy="180" r="1.5" fill="#1d1d1f" opacity="0.06" />
                    <circle cx="80" cy="200" r="1.5" fill="#1d1d1f" opacity="0.06" />
                    <circle cx="120" cy="220" r="1.5" fill="#1d1d1f" opacity="0.06" />
                    <circle cx="150" cy="240" r="1.5" fill="#1d1d1f" opacity="0.06" />
                    <circle cx="180" cy="280" r="1.5" fill="#1d1d1f" opacity="0.06" />
                    <circle cx="120" cy="270" r="1.5" fill="#1d1d1f" opacity="0.06" />
                    <circle cx="100" cy="250" r="1.5" fill="#1d1d1f" opacity="0.06" />
                    <circle cx="140" cy="190" r="1.5" fill="#1d1d1f" opacity="0.06" />
                    <circle cx="270" cy="90" r="1.5" fill="#1d1d1f" opacity="0.06" />
                    <circle cx="285" cy="85" r="1.5" fill="#1d1d1f" opacity="0.06" />
                    <circle cx="310" cy="70" r="1.5" fill="#1d1d1f" opacity="0.06" />
                    
                    {/* Dynamic Vector Curves */}
                    {DESTINATIONS.map((dest) => {
                      const isSelected = dest.id === activeDest;
                      return (
                        <g key={dest.id}>
                          <path
                            d={dest.pathQ}
                            stroke={isSelected ? "#b8860b" : "rgba(0,0,0,0.05)"}
                            strokeWidth={isSelected ? 2 : 1}
                            strokeDasharray={isSelected ? "none" : "3,3"}
                            className="transition-all duration-500"
                          />
                          {isSelected && (
                            <motion.path
                              d={dest.pathQ}
                              stroke="#b8860b"
                              strokeWidth={2.5}
                              strokeLinecap="round"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 1.2, ease: "easeInOut" }}
                            />
                          )}
                        </g>
                      );
                    })}

                    {/* Jebel Ali / Dubai hub marker */}
                    <g transform="translate(300, 80)">
                      <circle r="8" fill="rgba(201,169,110,0.25)" className="animate-pulse" />
                      <circle r="4" fill="#b8860b" />
                      <text x="12" y="4" fill="#b8860b" className="text-[7.5px] font-sans font-bold tracking-wider" opacity="0.9">DUBAÏ</text>
                    </g>

                    {/* Selected destination coordinates */}
                    {DESTINATIONS.map((dest) => {
                      const isSelected = dest.id === activeDest;
                      if (!isSelected) return null;
                      return (
                        <g key={dest.id} transform={`translate(${dest.coords.x}, ${dest.coords.y})`}>
                          <circle r="10" fill="rgba(201,169,110,0.25)" className="animate-ping" />
                          <circle r="4.5" fill="#b8860b" />
                          <text x="10" y="4" fill="#b8860b" className="text-[7.5px] font-sans font-bold tracking-wider">{dest.name.split(" ")[0].toUpperCase()}</text>
                        </g>
                      );
                    })}

                    {/* Moving cargo vector dash */}
                    {activeDest && (
                      <g>
                        <path
                          id="active-transit-path"
                          d={currentDest.pathQ}
                          fill="none"
                          stroke="none"
                        />
                        <circle r="3.5" fill="#1d1d1f" className="shadow-[0_0_8px_rgba(0,0,0,0.5)]">
                          <animateMotion dur="6s" repeatCount="indefinite">
                            <mpath href="#active-transit-path" />
                          </animateMotion>
                        </circle>
                      </g>
                    )}
                  </svg>
                </div>

                <div className="relative z-10 w-full flex items-center justify-between mt-auto">
                  <span className="text-[9px] font-sans tracking-[0.2em] font-semibold text-zinc-400 uppercase">
                    Lou Trading Route Optimization
                  </span>
                  <div className="flex gap-2 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-sans text-emerald-600 font-bold tracking-wider uppercase">Ligne active</span>
                  </div>
                </div>

              </div>

              {/* Transit Info Result Card */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md shadow-zinc-100/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-[#b8860b] uppercase block mb-1">
                      RÉSULTATS DE SIMULATION
                    </span>
                    <h4 className="text-xl font-serif font-bold text-[#1d1d1f] mb-2">
                      Dubaï vers {currentDest.name}
                    </h4>
                    <p className="text-xs font-sans font-light text-zinc-500 leading-relaxed">
                      {currentDest.details}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-l border-zinc-200 pl-6 md:pl-8">
                    <div>
                      <span className="block text-[8px] font-sans tracking-widest text-zinc-400 uppercase mb-1">TRANSIT EST.</span>
                      <span className="block text-base font-serif font-semibold text-[#b8860b]">{computedTime}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] font-sans tracking-widest text-zinc-400 uppercase mb-1">DOUANES EXPORT</span>
                      <span className="block text-xs font-sans font-medium text-emerald-600">Totalement gérées</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          5. CTA BLOCK
          ────────────────────────────────────────────────────────── */}
      <section className="relative z-20 pt-28 pb-28 sm:pt-36 sm:pb-36 px-6">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a96e]/10 blur-[150px]" aria-hidden="true" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[32px] border border-zinc-200 bg-white p-10 sm:p-18 shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
          >
            <span className="mb-4 inline-block text-[9px] font-sans font-bold tracking-[0.35em] uppercase text-[#b8860b]">
              Division Fret International
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-6 leading-tight">
              Prêt à lancer votre projet ?
            </h2>
            <div className="gold-separator mx-auto mb-6" />
            <p className="font-sans text-sm sm:text-base font-light text-zinc-600 max-w-xl mx-auto mb-12 leading-relaxed">
              Consultez un logisticien Lou Trading pour chiffrer précisément votre transport et recevoir une offre commerciale personnalisée en moins de 24h.
            </p>
            <div className="flex justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3.5 rounded-full bg-[#c9a96e] px-12 py-5 text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-zinc-950 transition-all duration-400 hover:scale-[1.03] shadow-[0_0_35px_rgba(201,169,110,0.22)] hover:shadow-[0_0_55px_rgba(201,169,110,0.45)] focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/50 cursor-pointer"
              >
                Contacter Lou
                <svg className="h-3.5 w-3.5 text-zinc-950 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Spacing container to separate the CTA card from the black footer */}
      <div className="h-16 sm:h-28 w-full bg-[#fafafc] relative z-20" />

    </div>
  );
}
