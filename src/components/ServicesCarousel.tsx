"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { EffectCoverflow, Navigation, Keyboard } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

// ─── DATA ───────────────────────────────────────────────────────────
const SECTORS = [
  {
    id: "chauffeur",
    title: "Chauffeur",
    subtitle: "Excellence au volant",
    description:
      "Conducteurs VIP, chauffeurs de maître pour familles royales et services de limousine de luxe à Dubaï.",
    youtubeId: "Sh-CAyCo5z8",
    cardImage: "/chauffeur.png",
  },
  {
    id: "restauration-cuisine",
    title: "Restauration / Cuisine",
    subtitle: "Gastronomie & Service",
    description:
      "Chefs cuisiniers, serveurs, commis de cuisine et barmans pour les hôtels 5 étoiles et la haute gastronomie.",
    youtubeId: "arTC_aQOcI8",
    cardImage: "/serveure.png",
  },
  {
    id: "securite",
    title: "Sécurité",
    subtitle: "Protection d'élite",
    description:
      "Agents de sécurité, gardes du corps et vigiles pour sites sensibles, événements VIP et résidences.",
    youtubeId: "ByycvqWp5rM",
    cardImage: "/securite.png",
  },
  {
    id: "btp",
    title: "Métiers du BTP",
    subtitle: "Force opérationnelle",
    description:
      "Ouvriers qualifiés, techniciens et opérateurs de chantier pour accompagner les grands chantiers aux Émirats.",
    youtubeId: "P3ZErG4X4Tw",
    cardImage: "/industrie.png",
  },
  {
    id: "personnel-maison-menage",
    title: "Personnel de Maison / Ménage",
    subtitle: "Propreté & Service",
    description:
      "Femmes de ménage, gouvernantes et personnel d'entretien pour résidences privées, villas et hôtels de luxe.",
    youtubeId: "oCOq0L2xeag",
    cardImage: "/menagere.png",
  },
  {
    id: "autre",
    title: "Autre",
    subtitle: "Opportunités sur-mesure",
    description:
      "Pour tout autre secteur ou métier sans diplôme requis, notre équipe évalue votre dossier pour vous connecter avec les meilleures opportunités.",
    bgVideo: "/dubai-video.mp4",
    cardImage: "/luxe.png",
  },
];

// ─── COMPONENT ──────────────────────────────────────────────────────
const VISIBLE_COUNT = 4; // Only show 4 pagination numbers at a time

export function ServicesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const activeSector = SECTORS[activeIndex];

  const goToSlide = useCallback(
    (idx: number) => {
      swiperRef.current?.slideTo(idx);
    },
    []
  );

  // Sliding window: always show VISIBLE_COUNT items, centered on active
  const totalItems = SECTORS.length;
  let windowStart = Math.max(0, activeIndex - Math.floor(VISIBLE_COUNT / 2));
  if (windowStart + VISIBLE_COUNT > totalItems) {
    windowStart = Math.max(0, totalItems - VISIBLE_COUNT);
  }
  const visibleIndices = SECTORS.slice(windowStart, windowStart + VISIBLE_COUNT).map((_, i) => windowStart + i);

  return (
    <section className="relative min-h-screen w-full bg-brand-black overflow-hidden">
      {/* ═══════════════════════════════════════════
          LAYER 0 — BACKGROUND YOUTUBE / VIDEO
          ═══════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {SECTORS.map((sector, idx) => (
          <div
            key={sector.id}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
              idx === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {sector.youtubeId ? (
              <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
                {/* Version desktop : iframe avec ratio 16/9 centré */}
                <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                  <iframe
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      width: "100vw",
                      height: "56.25vw",
                      minHeight: "100vh",
                      minWidth: "177.77vh",
                    }}
                    src={`https://www.youtube.com/embed/${sector.youtubeId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${sector.youtubeId}&modestbranding=1&playsinline=1`}
                    allow="autoplay; encrypted-media"
                    frameBorder="0"
                    title={sector.title}
                  />
                </div>
                {/* Version mobile : fallback sur l'image de la carte */}
                <Image
                  src={sector.cardImage}
                  alt={sector.title}
                  fill
                  className="object-cover sm:hidden"
                  priority={idx === activeIndex}
                />
              </div>
            ) : (
              <video
                src={sector.bgVideo}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            )}
          </div>
        ))}

        {/* Overlay LUMINEUX - ajusté pour mobile */}
        <div className="absolute inset-0 bg-brand-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/50 via-brand-black/5 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent sm:bg-gradient-to-t sm:from-brand-black sm:via-transparent sm:to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-brand-black to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════
          CONTENT (Z-10)
          ═══════════════════════════════════════════ */}
      <div className="relative z-10 flex items-center justify-center min-h-screen w-full px-4 sm:px-8 lg:px-16">
        <div className="w-full max-w-[1400px] flex flex-col lg:flex-row items-center gap-8 lg:gap-4 pt-20 pb-8 sm:pt-24 sm:pb-16 lg:pt-0 lg:pb-0">

          {/* ── LEFT SIDE ── */}
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 lg:gap-8 w-full lg:w-[45%] shrink-0">
            {/* ─── Numbered vertical pagination (sliding window of 4) - Caché sur mobile ─── */}
            <div className="hidden sm:flex flex-col items-center shrink-0 ml-0 sm:ml-2 lg:ml-6">
              {visibleIndices.map((idx, i) => (
                <div key={idx} className="flex flex-col items-center">
                  <button
                    onClick={() => goToSlide(idx)}
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-semibold transition-all duration-400 ${
                      idx === activeIndex
                        ? "bg-brand-gold text-brand-black shadow-[0_0_20px_rgba(212,175,55,0.4)] border-none scale-110"
                        : "bg-transparent border-[1.5px] border-white/40 text-white hover:border-white hover:text-white"
                    }`}
                  >
                    {idx + 1}
                  </button>
                  {i < visibleIndices.length - 1 && (
                    <div
                      className={`w-[1.5px] h-8 sm:h-12 transition-colors duration-400 ${
                        idx < activeIndex ? "bg-brand-gold/60" : "bg-white/30"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* ─── Text content ─── */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSector.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-start break-words"
                >
                  <div className="relative mb-4 sm:mb-8">
                    <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white lg:text-[3.5rem] leading-[1.1] drop-shadow-lg break-words">
                      {activeSector.title.split(" & ").map((word, i, arr) => (
                        <span key={i}>
                          {word}
                          {i < arr.length - 1 && (
                            <span className="text-brand-gold"> &amp; </span>
                          )}
                          {i < arr.length - 1 && (
                            <br className="hidden sm:block" />
                          )}
                        </span>
                      ))}
                    </h1>
                    <span className="block mt-2 sm:mt-3 w-16 sm:w-20 h-[2px] bg-gradient-to-r from-brand-gold to-transparent" />
                  </div>

                  <p className="max-w-sm font-sans text-sm sm:text-[15px] font-light leading-relaxed text-white/75 mb-6 sm:mb-12">
                    {activeSector.description}
                  </p>

                  <Link
                    href="/candidature"
                    className="group relative inline-flex items-center justify-center gap-3 sm:gap-4 rounded-full bg-brand-gold px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-[15px] font-sans font-bold tracking-wide text-brand-black transition-all duration-300 hover:bg-brand-gold/90 active:scale-95 sm:hover:scale-[1.05] shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:shadow-[0_0_45px_rgba(212,175,55,0.7)] w-full sm:w-auto"
                  >
                    Candidater
                    <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-brand-black/15 transition-all duration-300 group-hover:bg-brand-black/25 group-hover:translate-x-1">
                      <svg
                        className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── RIGHT SIDE (Cards + Arrows) ── */}
          <div className="w-full lg:w-[55%] flex flex-col items-center mt-6 sm:mt-8 lg:mt-0">
            {/* Swiper Container - Hauteur ajustée pour mobile */}
            <div className="w-full h-[260px] sm:h-[380px] lg:h-[420px]">
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                effect="coverflow"
                grabCursor
                centeredSlides
                slidesPerView="auto"
                keyboard={{ enabled: true }}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 30,
                  depth: 150,
                  modifier: 1,
                  slideShadows: false,
                }}
                navigation={{
                  nextEl: ".svc-btn-next",
                  prevEl: ".svc-btn-prev",
                }}
                modules={[EffectCoverflow, Navigation, Keyboard]}
                onSlideChange={(s) => setActiveIndex(s.activeIndex)}
                className="w-full h-full !overflow-visible"
              >
                {SECTORS.map((sector, idx) => (
                  <SwiperSlide
                    key={sector.id}
                    className="!w-[110px] sm:!w-[150px] lg:!w-[180px]"
                    style={{ height: "auto" }}
                  >
                    <div
                      className={`
                        relative h-[200px] sm:h-[300px] lg:h-[360px]
                        rounded-[16px] overflow-hidden
                        transition-all duration-500
                        ${
                          idx === activeIndex
                            ? "scale-100 opacity-100 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                            : "scale-[0.85] opacity-50"
                        }
                      `}
                      style={{
                        background:
                          idx === activeIndex
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(255,255,255,0.02)",
                      }}
                    >
                      <div className="relative w-full h-full rounded-[16px] overflow-hidden">
                        <Image
                          src={sector.cardImage}
                          alt={sector.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 110px, (max-width: 1024px) 150px, 180px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      </div>

                      <div
                        className={`absolute bottom-0 left-0 right-0 px-4 sm:px-7 pb-4 sm:pb-7 pt-4 transition-all duration-500 ${
                          idx === activeIndex
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        }`}
                      >
                        <h3 className="font-serif text-[11px] sm:text-[14px] font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] leading-tight">
                          {sector.title}
                        </h3>
                        <p className="font-sans text-[9px] sm:text-[10px] text-white/80 mt-1 tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                          {sector.subtitle}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Navigation arrows - visible sur mobile aussi */}
            <div className="flex items-center gap-4 mt-4 sm:mt-6">
              <button
                className="svc-btn-prev w-10 h-10 rounded-full border border-white/20 bg-black/20 backdrop-blur-xl flex items-center justify-center text-white/80 transition-all duration-300 hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold"
                aria-label="Secteur précédent"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="svc-btn-next w-10 h-10 rounded-full border border-white/20 bg-black/20 backdrop-blur-xl flex items-center justify-center text-white/80 transition-all duration-300 hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold"
                aria-label="Secteur suivant"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}