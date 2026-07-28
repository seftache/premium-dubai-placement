"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Comment trouver un emploi à Dubaï avec l'agence Emplois Dubaï ?",
    answer:
      "Pour trouver un emploi à Dubaï, soumettez gratuitement votre candidature via notre formulaire en ligne. Nos consultants en recrutement analysent vos compétences sous 48 heures et sélectionnent les offres d'emploi aux Émirats Arabes Unis correspondant le mieux à votre profil.",
  },
  {
    question: "Le visa de résidence et le permis de travail sont-ils garantis ?",
    answer:
      "Oui. Notre conciergerie de recrutement s'occupe de l'intégralité du processus administratif avec le Ministère du Travail de Dubaï (MOHRE) pour l'émission officielle de votre visa de résidence et de votre contrat de travail.",
  },
  {
    question: "Le logement et l'accueil à l'aéroport sont-ils pris en charge ?",
    answer:
      "Absolument. La majorité de nos placements premium comprennent un logement sécurisé, meublé et équipé dès votre arrivée, ainsi qu'un transfert VIP depuis l'aéroport international de Dubaï (DXB).",
  },
  {
    question: "Quels secteurs recrutent le plus actuellement à Dubaï ?",
    answer:
      "Les secteurs en forte demande à Dubaï incluent : les chauffeurs privés VIP et logistique, l'hôtellerie et la restauration haut de gamme, la sécurité privée, les métiers du BTP et de la construction, le personnel de maison, ainsi que le commerce et l'import-export.",
  },
  {
    question: "Faut-il parler couramment anglais pour travailler à Dubaï ?",
    answer:
      "Parler anglais est un avantage, mais nous disposons de nombreux postes ouverts aux candidats francophones avec une assistance francophone complète à chaque étape de votre installation.",
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
            Réponses aux questions les plus fréquentes sur le recrutement, l&apos;obtention du visa et l&apos;installation aux Émirats Arabes Unis.
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
