"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

/* ─────────────────────────────────────────
   DATA — Les 4 étapes
   ───────────────────────────────────────── */
interface ProcedureStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  image: string;
}

const STEPS: ProcedureStep[] = [
  {
    number: "01",
    title: "Candidature",
    subtitle: "Votre aventure commence ici.",
    description:
      "Soumettez votre profil en quelques minutes. Notre équipe analyse votre parcours, vos compétences et vos ambitions pour identifier les meilleures opportunités à Dubaï.",
    highlights: [
      "Formulaire simplifié",
      "Réponse sous 48h",
      "Analyse personnalisée",
    ],
    image: "/step-candidature.png",
  },
  {
    number: "02",
    title: "Entretien & Sélection",
    subtitle: "Trouvez votre poste idéal.",
    description:
      "Un consultant dédié vous accompagne lors d'un entretien approfondi. Nous évaluons votre profil et vous proposons les offres qui correspondent parfaitement à vos aspirations.",
    highlights: [
      "Consultant personnel",
      "Offres ciblées",
      "Matching exclusif",
    ],
    image: "/step-entretien.png",
  },
  {
    number: "03",
    title: "Démarches & Visa",
    subtitle: "Zéro stress, on gère tout.",
    description:
      "Nous prenons en charge l'intégralité des démarches administratives : visa de travail, permis de résidence, légalisations et formalités consulaires. Vous n'avez rien à faire.",
    highlights: [
      "Visa garanti",
      "Zéro paperasse",
      "Suivi en temps réel",
    ],
    image: "/step-visa.png",
  },
  {
    number: "04",
    title: "Départ & Nouvelle Vie",
    subtitle: "Bienvenue à Dubaï.",
    description:
      "Billet d'avion, accueil à l'aéroport, logement temporaire — nous orchestrons chaque détail pour que votre arrivée à Dubaï soit sans aucune surprise. Votre nouvelle vie commence.",
    highlights: [
      "Accueil VIP aéroport",
      "Logement sécurisé",
      "Intégration complète",
    ],
    image: "/step-arrivee.png",
  },
];

/* ─────────────────────────────────────────
   SINGLE STEP CARD (Vertical Parallax)
   ───────────────────────────────────────── */
function StepRow({ step, index }: { step: ProcedureStep; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 1;

  // Track scroll relative to this specific step row
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  // Parallax translation for the floating candidate image
  const imageY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  
  // Parallax scale and opacity to give a floating/dreamy look
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.3, 1, 1, 0.3]);

  return (
    <motion.div
      ref={rowRef}
      style={{ opacity: contentOpacity }}
      className="relative min-h-[85vh] flex items-center py-16 sm:py-24 lg:py-32 w-full z-10"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* ── IMAGE SIDE (Faded/blended into background with Parallax) ── */}
        <div className={`relative flex justify-center items-center w-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] ${isEven ? "lg:order-2" : "lg:order-1"}`}>
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            className="relative w-full max-w-[450px] aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]"
          >
            {/* The candidate image with soft radial mask to blend edges into the Palm Jumeirah view */}
            <div
              className="absolute inset-0 transition-all duration-700 hover:scale-[1.02]"
              style={{
                maskImage: "radial-gradient(circle, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 75%)",
                WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 75%)",
              }}
            >
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-cover object-center opacity-85 mix-blend-normal"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={85}
              />
            </div>
            
            {/* Step number watermark floating near image */}
            <div className="absolute -top-10 -left-6 lg:-top-16 lg:-left-12 pointer-events-none select-none z-0">
              <span className="font-serif text-[7rem] sm:text-[10rem] lg:text-[12rem] font-bold text-white/[0.07] leading-none">
                {step.number}
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── TEXT SIDE ── */}
        <div className={`flex flex-col justify-center w-full max-w-xl ${isEven ? "lg:order-1 lg:ml-auto lg:translate-x-36" : "lg:order-2 lg:mr-auto"}`}>
          {/* Step Number + Title */}
          <div className="flex items-baseline gap-4 mb-4">
            <span className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-none text-brand-gold">
              {step.number}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              {step.title}
            </h3>
          </div>

          {/* Subtitle */}
          <p
            className="font-serif italic text-base sm:text-lg mb-6 text-brand-gold/85"
          >
            {step.subtitle}
          </p>

          {/* Gold separator */}
          <div
            className="w-16 h-[2px] mb-8 bg-gradient-to-r from-brand-gold/80 to-brand-gold/10"
          />

          {/* Description */}
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-8 font-light">
            {step.description}
          </p>

          {/* Highlights badges */}
          <div className="flex flex-wrap gap-2.5">
            {step.highlights.map((h) => (
              <span
                key={h}
                className="
                  inline-flex items-center gap-2
                  px-4 py-2
                  bg-white/[0.04] backdrop-blur-sm
                  border border-white/[0.08]
                  rounded-full
                  text-xs sm:text-sm text-zinc-300 font-medium
                "
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-brand-gold/70"
                />
                {h}
              </span>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MAIN EXPORT
   ───────────────────────────────────────── */
export function ProcedureSection() {

  return (
    <section
      className="relative w-full bg-transparent overflow-hidden"
    >

      {/* ── SECTION HEADER ── */}
      <div className="relative z-10 w-full pt-28 sm:pt-36 lg:pt-40 pb-12 flex flex-col items-center">
        <div className="max-w-3xl text-center mx-auto px-6">
          <span
            className="text-[11px] font-sans font-medium tracking-[0.35em] uppercase mb-4 block text-brand-gold/85"
          >
            NOTRE PROCESSUS
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Quatre étapes vers <br />
            <span className="text-brand-gold/95">
              votre nouvelle vie.
            </span>
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] font-medium leading-relaxed text-zinc-300 max-w-2xl mx-auto">
            Un parcours structuré, transparent et entièrement pris en charge. De votre candidature à votre premier jour à Dubaï.
          </p>
        </div>
      </div>

      {/* ── VERTICAL PARALLAX ROWS ── */}
      <div className="relative z-10 w-full flex flex-col">
        {STEPS.map((step, index) => (
          <StepRow key={step.number} step={step} index={index} />
        ))}
      </div>

    </section>
  );
}
