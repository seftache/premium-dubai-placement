"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ─────────────────────────────────────────
   ANIMATION VARIANTS
   ───────────────────────────────────────── */
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
} as const;

/* ─────────────────────────────────────────
   HERO SECTION
   ───────────────────────────────────────── */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallaxe douce au scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 min-h-screen flex flex-col justify-center overflow-hidden bg-brand-black"
    >
      {/* ── 1. BACKGROUND IMAGE DÉZOOMÉE ──────────────────────── */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-x-0 -top-2 -bottom-6 w-full h-[calc(100%+24px)] z-0 pointer-events-none"
      >
        <Image
          src="/hero-resort-dubai.png"
          alt="Dubaï Luxury Waterfront Resort"
          fill
          className="object-cover object-[center_30%]"
          sizes="100vw"
          quality={95}
          priority
        />
      </motion.div>

      {/* ── 2. DÉGRADÉS NATURELS & LUMINEUX ──────────────────── */}
      {/* Voile latéral plus clair pour faire ressortir la lumière naturelle du paysage */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0.40) 38%, rgba(10,10,10,0.10) 68%, transparent 100%)",
        }}
      />

      {/* Fondu haut léger pour la barre de navigation */}
      <div
        className="absolute top-0 inset-x-0 h-28 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, transparent 100%)",
        }}
      />

      {/* Fondu bas discret vers la section suivante */}
      <div
        className="absolute bottom-0 inset-x-0 h-36 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.75) 65%, #0a0a0a 100%)",
        }}
      />

      {/* Lueur dorée douce en arrière-plan */}
      <div
        aria-hidden="true"
        className="
          absolute top-1/3 left-8 lg:left-20
          w-[450px] h-[450px]
          rounded-full
          pointer-events-none z-10
        "
        style={{
          background: "radial-gradient(ellipse at center, rgba(212,168,83,0.10) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* ── 3. CONTENU PRINCIPAL SANS AUCUN SUPPORT NI BOÎTE ─── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-24 flex flex-1 items-center">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          variants={container}
          initial="hidden"
          animate="visible"
          className="w-full max-w-2xl lg:max-w-xl text-left flex flex-col items-start"
        >

          {/* ─── BRITTANY (Signature manuscrite) ─── */}
          <motion.div variants={fadeUp} className="flex flex-col items-start gap-1 mb-4">
            <span className="font-brittany text-3xl sm:text-4xl lg:text-5xl text-[#d4b97a] leading-none drop-shadow-md">
              L&apos;Excellence à Dubaï
            </span>
            <div className="inline-flex items-center gap-2 border border-[#d4a853]/40 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4a853] animate-pulse" />
              <span className="font-montserrat text-[9px] sm:text-[10px] font-light tracking-[0.25em] text-[#d4a853] uppercase">
                Portail de Mise en Relation &amp; Recrutement
              </span>
            </div>
          </motion.div>

          {/* ─── DIDOT / BODONI (Titre majestueux) ─── */}
          <motion.h1
            variants={fadeUp}
            className="
              font-bodoni font-medium text-white tracking-tight leading-[1.08]
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl
              mb-6 drop-shadow-lg
            "
          >
            Emplois Dubaï
            <span className="block mt-2 font-normal text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-[#d4b97a]">
              Carrières &amp; Opportunités Privées
            </span>
          </motion.h1>

          {/* ─── MONTSERRAT LIGHT (Description) ─── */}
          <motion.div
            variants={fadeUp}
            className="
              font-montserrat-light text-zinc-300 leading-relaxed
              text-sm sm:text-base
              max-w-lg
              mb-8
              drop-shadow-sm
            "
          >
            <p className="font-normal text-white/95 mb-2 font-montserrat">
              Accédez aux meilleures perspectives professionnelles aux Émirats :
            </p>
            <p className="font-montserrat-light text-zinc-300">
              Mise en relation ciblée avec des employeurs et recruteurs partenaires vérifiés. Sélection rigoureuse et accompagnement informatif de prestige.
            </p>
          </motion.div>

          {/* ─── BADGES ─── */}
          <motion.div
            variants={container}
            className="flex flex-wrap items-center gap-2.5 mb-9"
          >
            <div className="flex items-center gap-2 border border-[#d4a853]/35 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-montserrat-light tracking-[0.18em] text-[#d4a853] uppercase">
              <svg className="w-3 h-3 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Recruteurs Vérifiés
            </div>
            <div className="flex items-center gap-2 border border-[#d4a853]/35 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-montserrat-light tracking-[0.18em] text-[#d4a853] uppercase">
              <svg className="w-3 h-3 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Opportunités Ciblées
            </div>
            <div className="flex items-center gap-2 border border-[#d4a853]/35 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-montserrat-light tracking-[0.18em] text-[#d4a853] uppercase">
              <svg className="w-3 h-3 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Réseau Partenaire
            </div>
          </motion.div>

          {/* ─── BOUTONS D'ACTION ─── */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/candidature"
              className="
                group inline-flex items-center gap-2
                bg-[#d4a853] hover:bg-[#c59843]
                text-black font-montserrat font-medium
                text-[10px] sm:text-[11px] tracking-[0.2em] uppercase
                px-7 py-3.5 rounded-full
                transition-all duration-300
                shadow-[0_4px_25px_rgba(212,168,83,0.35)] hover:shadow-[0_4px_35px_rgba(212,168,83,0.50)] hover:scale-[1.02]
              "
            >
              DÉPOSER MON PROFIL
            </Link>

            <Link
              href="/services"
              className="
                group inline-flex items-center gap-2
                border border-[#d4a853]/50 hover:border-[#d4a853]
                bg-black/40 hover:bg-[#d4a853]/10 backdrop-blur-md
                text-[#d4a853] hover:text-white font-montserrat font-light
                text-[10px] sm:text-[11px] tracking-[0.2em] uppercase
                px-7 py-3.5 rounded-full
                transition-all duration-300
              "
            >
              NOS DOMAINES
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </motion.div>

        </motion.div>
      </div>

      {/* ── 4. INDICATEUR DE SCROLL ──────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-montserrat-light text-[#d4a853] text-[9px] tracking-[0.3em] uppercase">
          SCROLL
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="block w-px h-7 rounded-full"
          style={{
            background: "linear-gradient(to bottom, rgba(212,168,83,0.7), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
