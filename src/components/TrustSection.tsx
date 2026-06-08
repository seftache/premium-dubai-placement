"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const TRUST_STEPS = [
  {
    number: "01",
    label: "Sélection Initiale",
    title: "Analyse & Audit",
    description: "Nous évaluons rigoureusement votre profil, vos compétences et vos ambitions pour garantir une adéquation parfaite avec les exigences du marché émirati.",
    image: "/step-analyse.png"
  },
  {
    number: "02",
    label: "Stratégie de Placement",
    title: "Ciblage Premium",
    description: "Notre réseau exclusif nous permet de vous positionner sur des opportunités invisibles sur le marché public, correspondant à votre niveau d'expertise.",
    image: "/step-placement.png"
  },
  {
    number: "03",
    label: "Démarches Officielles",
    title: "Golden Visa & Légalisation",
    description: "Nous prenons en charge l'intégralité du processus d'immigration, de la sponsorisation au traitement de votre visa de résidence avec une efficacité redoutable.",
    image: "/step-visa.png"
  },
  {
    number: "04",
    label: "Départ & Nouvelle Vie",
    title: "Bienvenue à Dubaï",
    description: "De l'accueil à l'aéroport jusqu'à votre installation dans un logement haut de gamme, nous orchestrons chaque détail de votre transition vers l'excellence.",
    image: "/step-arrivee.png"
  }
];

function TrustStep({ step, index }: { step: typeof TRUST_STEPS[0]; index: number }) {
  const isEven = index % 2 === 1;
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative min-h-[80vh] flex items-center py-16 sm:py-20 lg:py-0"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* ── IMAGE SIDE ── */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -80 : 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`relative overflow-hidden rounded-2xl shadow-2xl aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] ${isEven ? "lg:order-1" : "lg:order-2"}`}
        >
          {/* Parallax image container */}
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            className="absolute inset-[-10%] w-[120%] h-[120%]"
          >
            <Image
              src={step.image}
              alt={step.title}
              fill
              className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={index === 0}
            />
          </motion.div>
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-brand-black/20 mix-blend-multiply" />
          
          {/* Step number watermark on image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <span className="font-serif text-[8rem] sm:text-[10rem] font-bold text-white/40 leading-none select-none drop-shadow-2xl mix-blend-overlay">
              {step.number}
            </span>
          </div>
        </motion.div>

        {/* ── TEXT SIDE ── */}
        <div className={`flex flex-col justify-center w-full max-w-xl ${isEven ? "lg:order-2 lg:mr-auto" : "lg:order-1 lg:ml-auto"}`}>
          {/* Step label */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 inline-block text-[11px] font-sans font-medium tracking-[0.35em] uppercase text-brand-gold/60"
          >
            {step.label}
          </motion.span>

          {/* Number + Title */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mb-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-6">
              <span className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-gold/60 leading-none drop-shadow-lg">
                {step.number}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {step.title}
              </h2>
            </div>
          </motion.div>

          {/* Separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-16 h-[2px] bg-gradient-to-r from-brand-gold to-brand-gold/20 origin-left mt-4 mb-8"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/70 font-sans text-base sm:text-lg leading-relaxed"
          >
            {step.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

export function TrustSection() {
  return (
    <section className="relative w-full bg-brand-black overflow-hidden py-20 lg:py-32">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-black via-brand-black/50 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent pointer-events-none z-10" />

      {/* Intro Header */}
      <div className="container-premium mx-auto relative z-20 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-center mx-auto"
        >
          <span className="text-brand-gold font-sans text-[11px] font-bold tracking-[0.3em] uppercase mb-4 block">
            {"L'Engagement Premium"}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Votre réussite est <br />notre seule priorité
          </h2>
        </motion.div>
      </div>

      <div className="relative z-20">
        {TRUST_STEPS.map((step, index) => (
          <TrustStep key={step.number} step={step} index={index} />
        ))}
      </div>
    </section>
  );
}
