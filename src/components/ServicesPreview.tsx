"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

/* ============================================
   DATA — Secteurs
   ============================================ */
const SECTORS = [
  { name: "Chauffeur", desc: "Chauffeurs privés · VIP · Transport de luxe" },
  { name: "Restauration / Cuisine", desc: "Chefs · Cuisine · Service de prestige" },
  { name: "Sécurité", desc: "Protection · Surveillance · Vigiles" },
  { name: "Métiers du BTP", desc: "Chantier · Ouvriers spécialisés · Construction" },
  { name: "Personnel de Maison / Ménage", desc: "Gouvernantes · Ménage · Entretien résidentiel" },
  { name: "Autre", desc: "Opportunités sur-mesure sans diplôme requis" },
];

export function ServicesPreview() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-10% 0px" });

  return (
    <section 
      className="relative z-10 w-full pt-36 pb-40 sm:pt-48 sm:pb-56" 
      id="secteurs"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 flex flex-col items-center">

        {/* ── HEADER ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20 sm:mb-28 w-full max-w-3xl flex flex-col items-center justify-center"
        >
          <span className="mb-5 inline-block text-[11px] font-sans font-medium tracking-[0.4em] uppercase text-brand-gold/80 drop-shadow-md">
            Nos domaines d&apos;expertise
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 drop-shadow-2xl text-center">
            Un réseau, <br className="sm:hidden" />
            <span className="text-brand-gold/90 drop-shadow-xl">nos expertises.</span>
          </h2>
          <p className="font-sans text-[16px] sm:text-[17px] font-medium leading-relaxed text-white max-w-xl mx-auto drop-shadow-lg text-center">
            Chaque secteur bénéficie d&apos;un réseau dédié d&apos;entreprises partenaires
            et d&apos;une expertise pointue du marché émirati.
          </p>
        </motion.div>

        {/* ── SECTORS LIST ── */}
        <div className="w-full max-w-3xl rounded-[32px] bg-brand-black/50 backdrop-blur-xl p-6 sm:p-10 lg:p-12 border border-white/[0.08] shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
          <div className="space-y-0">
            {SECTORS.map((sector, i) => (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  href="/services"
                  className="group flex flex-col sm:flex-row items-center justify-between py-6 sm:py-6 border-b border-white/[0.08] transition-all duration-500 hover:border-brand-gold/30 sm:hover:px-6 w-full"
                >
                  {/* Left: Number + Name */}
                  <div className="flex items-center gap-6">
                    <span className="font-serif text-[18px] text-brand-gold/60 font-light tabular-nums w-8 transition-colors duration-300 group-hover:text-brand-gold">
                      0{i + 1}
                    </span>
                    <h3 className="font-serif text-[18px] sm:text-[24px] font-semibold text-white drop-shadow-lg group-hover:text-brand-gold transition-colors duration-300">
                      {sector.name}
                    </h3>
                  </div>

                  {/* Right: Description + Arrow */}
                  <div className="flex flex-row items-center justify-between w-full sm:w-auto gap-4 sm:gap-6 pl-11 sm:pl-0">
                    <span className="font-sans text-[13px] sm:text-[14px] font-medium text-white/80 drop-shadow-md text-left sm:text-right max-w-[450px] transition-colors duration-300 group-hover:text-white">
                      {sector.desc}
                    </span>
                    <div className="flex w-10 h-10 rounded-full border border-white/10 items-center justify-center flex-shrink-0 transition-all duration-400 group-hover:border-brand-gold/40 group-hover:bg-brand-gold/15">
                      <svg className="w-4 h-4 text-white/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-20 mt-20 sm:mt-32 flex justify-center w-full"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-4 rounded-full bg-brand-gold px-12 py-5 text-[15px] font-sans font-bold tracking-wide text-brand-black transition-all duration-400 hover:scale-[1.03] shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.6)]"
          >
            Découvrir tous nos secteurs
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-black/20 transition-all duration-300 group-hover:translate-x-1">
              <svg className="h-3.5 w-3.5 text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}