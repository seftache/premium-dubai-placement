"use client";

import { motion } from "framer-motion";
import Link from "next/link";

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

      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 flex flex-col items-center">
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12 sm:mb-16 w-full flex flex-col items-center justify-center"
        >
          <span className="mb-4 inline-block text-[11px] font-sans font-medium tracking-[0.4em] uppercase text-brand-gold/80 drop-shadow-md">
            Mise en Relation &amp; Accompagnement
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] drop-shadow-xl mb-6">
            Procédure Complète <br className="hidden sm:block" />
            <span className="text-brand-gold/90">&amp; Installation de Prestige</span>
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] font-light leading-relaxed text-zinc-400 max-w-2xl mx-auto text-center">
            Un service d&apos;accompagnement dédié pour concrétiser votre avenir professionnel à Dubaï :
            mise en relation avec des recruteurs partenaires et orientation personnalisée.
          </p>
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

          {/* LEFT SIDE: Profil & Modalités */}
          <div className="w-full md:w-[55%] p-8 sm:p-12 flex flex-col justify-between relative z-10">
            <div>
              {/* Card Label */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                <span className="text-[10px] font-sans font-bold tracking-[0.25em] uppercase text-brand-gold/90">
                  Accompagnement Partenaires
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                Étude de Profil
              </h3>
              <p className="font-sans text-xs text-zinc-400 font-light mb-8">
                Orientation ciblée et mise en relation privilégiée.
              </p>

              {/* Modalités Presentation */}
              <div className="mb-6 min-h-[72px] flex flex-col justify-center">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Sur Étude de Dossier
                </span>
                <span className="text-xs font-sans text-brand-gold/80 font-light mt-1">
                  Conditions définies selon le secteur et l&apos;employeur partenaire
                </span>
              </div>

              {/* Reassuring Pillars */}
              <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm mb-8">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-sans font-bold tracking-widest text-brand-gold mb-1">
                    Dépôt de Profil
                  </span>
                  <span className="text-[10px] text-zinc-400 font-sans mb-1 font-light leading-none">
                    Évaluation initiale
                  </span>
                  <div className="h-6 flex items-end">
                    <span className="text-[15px] sm:text-lg font-bold text-white font-sans">
                      100% Gratuit
                    </span>
                  </div>
                </div>

                <div className="flex flex-col border-l border-white/10 pl-5">
                  <span className="text-[9px] uppercase font-sans font-bold tracking-widest text-brand-gold mb-1">
                    Modalités
                  </span>
                  <span className="text-[10px] text-zinc-400 font-sans mb-1 font-light leading-none">
                    Conditions contractuelles
                  </span>
                  <div className="h-6 flex items-end">
                    <span className="text-[15px] sm:text-lg font-bold text-white font-sans">
                      Sur Mesure
                    </span>
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
                DÉPOSER MON PROFIL
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
                Services Proposés
              </h4>

              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <GoldCheckIcon />
                  <div className="flex flex-col">
                    <span className="text-[14px] font-sans font-medium text-white">
                      Mise en relation avec employeurs partenaires
                    </span>
                    <span className="text-[12px] font-sans font-light text-zinc-500 leading-snug mt-0.5">
                      Transmission de votre profil aux recruteurs. Les démarches de visa sont gérées directement par les employeurs sponsors.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <GoldCheckIcon />
                  <div className="flex flex-col">
                    <span className="text-[14px] font-sans font-medium text-white">
                      Options de logement via nos partenaires
                    </span>
                    <span className="text-[12px] font-sans font-light text-zinc-500 leading-snug mt-0.5">
                      Orientation vers les solutions d&apos;hébergement et options proposées par les employeurs partenaires.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <GoldCheckIcon />
                  <div className="flex flex-col">
                    <span className="text-[14px] font-sans font-medium text-white">
                      Recherche d&apos;opportunités ciblées
                    </span>
                    <span className="text-[12px] font-sans font-light text-zinc-500 leading-snug mt-0.5">
                      Opportunités ciblées (Chauffeur, Restauration, Sécurité, Santé, Luxe...).
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <GoldCheckIcon />
                  <div className="flex flex-col">
                    <span className="text-[14px] font-sans font-medium text-white">
                      Accompagnement &amp; Suivi de dossier
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
                * Conditions contractuelles établies lors de l&apos;entretien partenaire.
              </span>
              <span className="text-[10px] font-sans font-bold tracking-widest text-zinc-600 uppercase">
                Sur Mesure
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