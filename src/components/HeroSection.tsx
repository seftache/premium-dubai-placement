"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import heroBg from "../../public/hero-dubai-night.jpg";

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
    transition: { duration: 0.8, ease: "easeOut" },
  },
} as const;

/* ─────────────────────────────────────────
   MAIN EXPORT
   ───────────────────────────────────────── */
export function HeroSection() {
  return (
    <section className="relative z-10 min-h-screen flex flex-col overflow-hidden bg-brand-black">

      {/* ── 1. BACKGROUND IMAGE ──────────────────────── */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src={heroBg}
          alt="Dubaï skyline de nuit"
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
          priority
        />
      </div>

      {/* ── 2. CINEMATIC OVERLAY GRADIENT ────────────── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(10,10,10,0.60) 60%, #0a0a0a 100%)",
        }}
      />

      {/* ── 3. SUBTLE GOLD GLOW (behind text) ────────── */}
      <div
        aria-hidden="true"
        className="
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[600px] h-[600px]
          rounded-full
          pointer-events-none z-10
        "
        style={{
          background: "radial-gradient(ellipse at center, rgba(212,168,83,0.06) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* ── 4. MAIN CONTENT ──────────────────────────── */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-6 pt-24 pb-20 min-h-screen">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-4xl mx-auto w-full"
        >

          {/* ─── EYE-BROW / SURTITRE (Gold Capsule outline) ─── */}
          <motion.div
            variants={fadeUp}
            className="inline-block border border-[#d4a853]/40 px-4.5 py-1.5 rounded-full mb-6 bg-[#d4a853]/5"
          >
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] font-sans font-medium text-[#d4a853] uppercase">
              • CONCIERGERIE DE RECRUTEMENT D&apos;ÉLITE •
            </span>
          </motion.div>

          {/* ─── H1 TITLE ────────────────────────────── */}
          <motion.h1
            variants={fadeUp}
            className="
              font-serif font-medium text-white tracking-tight leading-[1.1]
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl
              mb-8
            "
          >
            Votre Carrière à Dubaï
            <br />
            <span className="text-[#d4a853]">Commence Ici.</span>
          </motion.h1>

          {/* ─── DESCRIPTION ─────────────────────────── */}
          <motion.div
            variants={fadeUp}
            className="
              text-zinc-400 font-sans font-light leading-relaxed
              text-sm sm:text-base
              max-w-xl
              mb-10
            "
          >
            <p className="font-semibold text-white mb-2">Une prise en charge intégrale et sur-mesure :</p>
            <p className="text-zinc-400">Visa, Logement, Emploi premium — nous orchestrons chaque étape de votre nouvelle vie aux Émirats.</p>
          </motion.div>

          {/* ─── PILLS / BADGES (Gold Outlined Capsules) ─── */}
          <motion.div
            variants={container}
            className="flex flex-wrap items-center justify-center gap-3.5 mb-10 mt-2"
          >
            <div className="flex items-center gap-2 border border-[#d4a853]/30 bg-[#d4a853]/5 px-3.5 py-1.5 rounded-full text-[10px] font-medium tracking-wider text-[#d4a853] uppercase">
              <svg className="w-3 h-3 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              VISA GARANTI
            </div>
            <div className="flex items-center gap-2 border border-[#d4a853]/30 bg-[#d4a853]/5 px-3.5 py-1.5 rounded-full text-[10px] font-medium tracking-wider text-[#d4a853] uppercase">
              <svg className="w-3.5 h-3.5 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              LOGEMENT PREMIUM
            </div>
            <div className="flex items-center gap-2 border border-[#d4a853]/30 bg-[#d4a853]/5 px-3.5 py-1.5 rounded-full text-[10px] font-medium tracking-wider text-[#d4a853] uppercase">
              <svg className="w-3.5 h-3.5 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              EMPLOI D&apos;EXCEPTION
            </div>
          </motion.div>

          {/* ─── CTA BUTTONS ─────────────────────────── */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-5"
          >
            <Link
              href="/candidature"
              className="
                group inline-flex items-center gap-2
                bg-[#d4a853] hover:bg-[#c59843]
                text-black font-semibold
                text-[11px] tracking-[0.2em] uppercase
                px-8 py-4 rounded-sm
                transition-all duration-400
                shadow-[0_0_30px_rgba(212,168,83,0.25)] hover:shadow-[0_0_40px_rgba(212,168,83,0.40)]
              "
            >
              DÉMARRER MON PROJET
            </Link>

            <Link
              href="/services"
              className="
                group inline-flex items-center gap-2
                border border-[#d4a853]/40 hover:border-[#d4a853]
                text-[#d4a853] font-semibold
                text-[11px] tracking-[0.2em] uppercase
                px-8 py-4 rounded-sm
                transition-all duration-300
              "
            >
              DÉCOUVRIR NOS SERVICES
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </motion.div>

        </motion.div>
      </div>

      {/* ── 5. BOTTOM FADE TO BLACK ──────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-40 z-20 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #0a0a0a)",
        }}
      />

      {/* ── 6. SCROLL INDICATOR ──────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[#d4a853] text-[9px] tracking-[0.3em] uppercase font-medium">
          SCROLL
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="block w-px h-8 rounded-full"
          style={{
            background: "linear-gradient(to bottom, rgba(212,168,83,0.6), transparent)",
          }}
        />
      </motion.div>

    </section>
  );
}
