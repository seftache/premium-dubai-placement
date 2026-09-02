"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Comment fonctionne la mise en relation avec Emplois Dubaï ?",
    answer:
      "Pour accéder aux opportunités à Dubaï, soumettez votre profil via notre formulaire en ligne. Notre équipe transmet vos informations à des recruteurs partenaires aux Émirats Arabes Unis correspondant le mieux à vos compétences.",
  },
  {
    question: "Comment sont gérés les visas de travail et de résidence à Dubaï ?",
    answer:
      "Les visas de travail et permis de résidence sont traités et pris en charge directement par les employeurs partenaires selon la réglementation officielle du Ministère du Travail (MOHRE) des Émirats Arabes Unis.",
  },
  {
    question: "Des options de logement sont-elles proposées par les employeurs à Dubaï ?",
    answer:
      "De nombreuses offres de nos employeurs partenaires incluent des options de logement ou des indemnités d'hébergement. Les conditions exactes sont communiquées directement par l'employeur recruteur.",
  },
  {
    question: "Quels secteurs recrutent le plus actuellement à Dubaï ?",
    answer:
      "Les secteurs en forte demande à Dubaï incluent : les chauffeurs privés VIP et logistique, l'hôtellerie et la restauration haut de gamme, la sécurité privée, les métiers du BTP et de la construction, le personnel de maison, ainsi que le commerce et l'import-export.",
  },
  {
    question: "Faut-il parler couramment anglais pour travailler à Dubaï ?",
    answer:
      "Parler anglais est un avantage, mais nos partenaires proposent également des postes ouverts aux candidats francophones avec un accompagnement adapté.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative z-10 w-full py-24 bg-brand-black/80 border-t border-white/10" id="faq">
      <div className="w-full max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-sans font-medium tracking-[0.35em] uppercase text-brand-gold/90 mb-3 block">
            FOIRE AUX QUESTIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Tout savoir sur les <span className="text-brand-gold">Emplois à Dubaï</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-light max-w-2xl mx-auto">
            Réponses aux questions les plus fréquentes sur la mise en relation, les opportunités d&apos;emploi et l&apos;installation aux Émirats Arabes Unis.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-brand-gold/30"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <h3 className="font-serif text-base sm:text-lg font-semibold text-white/90 pr-2">
                    {faq.question}
                  </h3>
                  <div
                    className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-brand-gold transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180 bg-brand-gold/10 border-brand-gold/40" : ""
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-zinc-300 font-light leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
