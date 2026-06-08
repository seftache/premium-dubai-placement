"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const UNIVERSE_PAGES: Record<string, { title: string; videoId: string; subject: string }> = {
  electronique: { title: "Silicium & Intelligence", videoId: "sJsATGnTPtk", subject: "ordinateurs et matériel électronique" },
  automobile: { title: "Hypercars & Vitesse", videoId: "bWlgfsU9JJk", subject: "véhicules et automobiles" },
  medical: { title: "Photonique & Santé", videoId: "K3uH1kXzXQc", subject: "équipements médicaux" },
  fashion: { title: "Haute Couture & Éclat", videoId: "0es4QImA4pM", subject: "vêtements et haute couture" },
  rechange: { title: "Vélocité Mécanique", videoId: "AjDKsPznQ_s", subject: "pièces de rechange mécaniques" },
  industrie: { title: "Robotique & Force", videoId: "wX-y8G-h7E0", subject: "machines industrielles et robotique" },
  cosmetics: { title: "Alchimie & Beauté", videoId: "0es4QImA4pM", subject: "produits cosmétiques et de beauté" },
  nobles: { title: "Structure & Matière", videoId: "9g2g4R7Qz6A", subject: "matériaux de construction" },
  alimentation: { title: "Terroirs & Épices", videoId: "z7gAp8WdjRi", subject: "produits alimentaires" },
  energie: { title: "Énergie & Hélios", videoId: "lZZx88ziqbM", subject: "équipements liés à l'énergie" },
};

const WHATSAPP_NUMBER = "971526252539";

export default function UniverseDedicatedPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const data = UNIVERSE_PAGES[slug];
  const [doorState, setDoorState] = useState<"closed" | "open">("closed");

  useEffect(() => {
    if (!data) return;
    // Laisser le titre visible 2.5 secondes, puis ouvrir les portes
    const timer = setTimeout(() => {
      setDoorState("open");
    }, 2500);
    return () => clearTimeout(timer);
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <button onClick={() => router.back()} className="text-white/60 hover:text-white transition-colors text-sm tracking-widest uppercase">
          ← Retour
        </button>
      </div>
    );
  }

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Bonjour Lou Transit, je souhaite initier une importation concernant les ${data.subject}. Pouvez-vous m'accompagner ?`
  )}`;

  return (
    <main className="relative min-h-screen w-full bg-black overflow-hidden font-sans">
      
      {/* 1. BACKGROUND VIDEO (La vidéo à l'honneur, très lumineuse) */}
      <div className="absolute inset-0 z-0">
        {/* Vignette très douce uniquement sur les bords extrêmes pour encadrer l'interface sans cacher la vidéo */}
        <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)' }} />
        <iframe
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: "100vw",
            height: "56.25vw",
            minHeight: "100vh",
            minWidth: "177.77vh",
          }}
          src={`https://www.youtube.com/embed/${data.videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${data.videoId}&modestbranding=1&playsinline=1&quality=hd2160`}
          allow="autoplay; encrypted-media"
          frameBorder="0"
          title={data.title}
        />
      </div>

      {/* 2. THE DOORS & INTRO TITLE (Z-20) */}
      {/* Porte Gauche */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: doorState === "open" ? "-100%" : "0%" }}
        transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 w-1/2 h-full bg-black z-20"
      />
      
      {/* Porte Droite */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: doorState === "open" ? "100%" : "0%" }}
        transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 right-0 w-1/2 h-full bg-black z-20"
      />

      {/* Titre Introductif Majestueux */}
      <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={
            doorState === "closed"
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, scale: 1.05, filter: "blur(10px)" }
          }
          transition={{ 
            duration: doorState === "closed" ? 1.5 : 0.8, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="text-[clamp(40px,8vw,120px)] font-bold text-white leading-[0.9] tracking-[-0.04em] text-center px-6"
          style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          {data.title}
        </motion.h1>
      </div>

      {/* 3. FINAL CONTENT (Z-10) - Apparaît après l'ouverture des portes */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-between py-12 px-6 pointer-events-none">
        
        {/* Top: Petit titre élégant pour rappeler l'univers */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: doorState === "open" ? 1 : 0, y: doorState === "open" ? 0 : -20 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-white/50 mb-3">Univers</p>
          <h2 
            className="text-lg sm:text-2xl font-medium text-white/90 tracking-wide"
            style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            {data.title}
          </h2>
        </motion.div>

        {/* Bottom: Bouton d'action Premium & Retour */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: doorState === "open" ? 1 : 0, y: doorState === "open" ? 0 : 30 }}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6 pointer-events-auto"
        >
          {/* CTA Button Minimaliste */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-4 px-8 py-4 sm:px-10 sm:py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white transition-all duration-700 hover:bg-white/15 hover:border-white/30 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] active:scale-95"
          >
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase">
              Importer via Lou Transit
            </span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 transition-transform duration-500 group-hover:translate-x-1.5 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          {/* Retour discret avec marge supplémentaire pour séparer du bouton */}
          <button
            onClick={() => router.back()}
            className="mt-6 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white/80 transition-colors duration-500"
          >
            ← Retour
          </button>
        </motion.div>
      </div>

    </main>
  );
}
