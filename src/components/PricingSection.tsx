"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ============================================
   TYPES
   ============================================ */
interface Currency {
  code: string;
  symbol: string;
  label: string;
  total: string;
  acompte: string;
  solde: string;
  isPrefix: boolean;
}

/* ============================================
   CURRENCIES DATA
   ============================================ */
const CURRENCIES: Currency[] = [
  {
    code: "FCFA",
    symbol: "FCFA",
    label: "FCFA",
    total: "1 400 000",
    acompte: "500 000",
    solde: "900 000",
    isPrefix: false,
  },
  {
    code: "EUR",
    symbol: "€",
    label: "EUR (€)",
    total: "2 135",
    acompte: "765",
    solde: "1 370",
    isPrefix: false,
  },
  {
    code: "USD",
    symbol: "$",
    label: "USD ($)",
    total: "2 300",
    acompte: "820",
    solde: "1 480",
    isPrefix: true,
  },
  {
    code: "AED",
    symbol: "د.إ",
    label: "AED (د.إ)",
    total: "8 500",
    acompte: "3 000",
    solde: "5 500",
    isPrefix: false,
  },
];

/* ============================================
   CHECK ICON
   ============================================ */
function GoldCheckIcon() {
  return (
    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center mt-1">
      <svg
        className="w-2.5 h-2.5 text-brand-gold"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
    </div>
  );
}

/* ============================================
   MAIN EXPORT
   ============================================ */
export function PricingSection() {
  const [activeCurrency, setActiveCurrency] = useState<Currency>(CURRENCIES[0]);

  return (
    <section 
      className="relative z-10 w-full pt-16 pb-24 overflow-hidden" 
      id="tarifs"
    >
      {/* ── Decorative top line ── */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

      {/* ── Ambient background glows ── */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[650px] rounded-full z-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(201, 169, 110, 0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 flex flex-col items-center">
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12 sm:mb-16 w-full flex flex-col items-center justify-center"
        >
          <span className="mb-4 inline-block text-[11px] font-sans font-medium tracking-[0.4em] uppercase text-brand-gold/80 drop-shadow-md">
            Tarif VIP &amp; Tout Inclus
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] drop-shadow-xl mb-6">
            Procédure Complète <br className="hidden sm:block" />
            <span className="text-brand-gold/90">&amp; Installation de Prestige</span>
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] font-light leading-relaxed text-zinc-400 max-w-2xl mx-auto text-center">
            Un package unique premium pour concrétiser votre avenir professionnel à Dubaï.
            De l&apos;obtention de votre visa de résidence à votre placement garanti.
          </p>
        </motion.div>

        {/* ── CURRENCY SWITCHER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-8"
        >
          <div className="rounded-full bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-1 flex gap-2 mx-auto w-fit">
            {CURRENCIES.map((currency) => (
              <button
                key={currency.code}
                onClick={() => setActiveCurrency(currency)}
                className={`
                  relative px-5 py-2 rounded-full
                  text-[10px] font-sans font-bold tracking-[0.15em] uppercase
                  transition-colors duration-300 cursor-pointer
                  ${
                    activeCurrency.code === currency.code
                      ? "text-black"
                      : "text-zinc-400 hover:text-zinc-200"
                  }
                `}
              >
                {activeCurrency.code === currency.code && (
                  <motion.div
                    layoutId="active-currency-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-dark"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{currency.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── SINGLE PREMIUM CARD LAYOUT ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full max-w-3xl rounded-[32px] overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 hover:border-amber-500/30 transition-all duration-700 shadow-[0_0_80px_rgba(0,0,0,0.7)] group flex flex-col md:flex-row"
        >
          {/* Subtle VIP badge glow behind card */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[32px] z-0 transition-opacity duration-700 opacity-60 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(201, 169, 110, 0.07) 0%, transparent 60%)",
            }}
          />

          {/* LEFT SIDE: Price presentation & CTA */}
          <div className="w-full md:w-[55%] p-8 sm:p-12 flex flex-col justify-between relative z-10">
            <div>
              {/* Card Label */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                <span className="text-[10px] font-sans font-bold tracking-[0.25em] uppercase text-brand-gold/90">
                  Accès Membre VIP
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                Pack Premium Unique
              </h3>
              <p className="font-sans text-xs text-zinc-400 font-light mb-8">
                Prise en charge intégrale, de A à Z.
              </p>

              {/* Price Container (Layout stable, no jumps) */}
              <div className="mb-6 min-h-[72px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCurrency.code}
                    initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex items-baseline gap-2 font-serif"
                  >
                    {activeCurrency.isPrefix && (
                      <span className="text-brand-gold text-3xl font-sans font-medium tracking-normal mr-1">
                        {activeCurrency.symbol}
                      </span>
                    )}
                    <span className="text-5xl sm:text-6xl font-bold text-white tracking-tight font-serif">
                      {activeCurrency.total}
                    </span>
                    {!activeCurrency.isPrefix && (
                      <span className="text-brand-gold text-2xl font-sans font-medium tracking-normal ml-2">
                        {activeCurrency.symbol}
                      </span>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Reassuring Payments Breakdown */}
              <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm mb-8">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-sans font-bold tracking-widest text-zinc-500 mb-1">
                    Acompte
                  </span>
                  <span className="text-[10px] text-zinc-400 font-sans mb-1 font-light leading-none">
                    Pour lancer les démarches
                  </span>
                  <div className="h-6 flex items-end">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`acompte-${activeCurrency.code}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="text-[15px] sm:text-lg font-bold text-brand-gold font-sans"
                      >
                        {activeCurrency.acompte} {activeCurrency.symbol}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex flex-col border-l border-white/10 pl-5">
                  <span className="text-[9px] uppercase font-sans font-bold tracking-widest text-zinc-500 mb-1">
                    Solde
                  </span>
                  <span className="text-[10px] text-zinc-400 font-sans mb-1 font-light leading-none">
                    À l&apos;obtention du visa
                  </span>
                  <div className="h-6 flex items-end">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`solde-${activeCurrency.code}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="text-[15px] sm:text-lg font-bold text-white font-sans"
                      >
                        {activeCurrency.solde} {activeCurrency.symbol}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button with High-End Slide-Fill Effect */}
            <Link
              href="/candidature"
              className="relative w-full py-4.5 rounded-full border border-brand-gold/40 text-brand-gold font-sans font-bold tracking-[0.2em] text-[11px] uppercase flex items-center justify-center gap-3 overflow-hidden transition-all duration-500 hover:text-black hover:border-brand-gold group/btn"
            >
              <span className="absolute inset-0 bg-brand-gold origin-left transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
              <span className="relative z-10 flex items-center gap-2">
                LANCER MA PROCÉDURE
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </Link>
          </div>

          {/* RIGHT SIDE: Benefits List & Mentions */}
          <div className="w-full md:w-[45%] p-8 sm:p-12 bg-white/[0.01] border-t md:border-t-0 md:border-l border-white/5 flex flex-col justify-between relative z-10">
            <div>
              <h4 className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-zinc-500 mb-8">
                Prestations Incluses
              </h4>

              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <GoldCheckIcon />
                  <div className="flex flex-col">
                    <span className="text-[14px] font-sans font-medium text-white">
                      Visa de résidence garanti
                    </span>
                    <span className="text-[12px] font-sans font-light text-zinc-500 leading-snug mt-0.5">
                      Prise en charge intégrale des démarches et obtention sous quelques semaines.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <GoldCheckIcon />
                  <div className="flex flex-col">
                    <span className="text-[14px] font-sans font-medium text-white">
                      Logement hôtel inclus à l&apos;arrivée
                    </span>
                    <span className="text-[12px] font-sans font-light text-zinc-500 leading-snug mt-0.5">
                      Accueil VIP et hébergement réservé pour vos premiers jours sur place.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <GoldCheckIcon />
                  <div className="flex flex-col">
                    <span className="text-[14px] font-sans font-medium text-white">
                      Recherche d&apos;emploi &amp; placement
                    </span>
                    <span className="text-[12px] font-sans font-light text-zinc-500 leading-snug mt-0.5">
                      Placement sécurisé (Chauffeur, Restauration, Sécurité, Santé, Luxe...).
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <GoldCheckIcon />
                  <div className="flex flex-col">
                    <span className="text-[14px] font-sans font-medium text-white">
                      Accompagnement WhatsApp 24/7
                    </span>
                    <span className="text-[12px] font-sans font-light text-zinc-500 leading-snug mt-0.5">
                      Une ligne d&apos;assistance directe pour répondre à toutes vos interrogations.
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Special Mention / Footnote */}
            <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-[12px] font-sans font-light text-zinc-500">
                * Billet d&apos;avion à la charge du candidat.
              </span>
              <span className="text-[10px] font-sans font-bold tracking-widest text-zinc-600 uppercase">
                Fixed Price
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Bottom spacing ── */}
        <div className="h-28 sm:h-36 w-full" />
      </div>
    </section>
  );
}