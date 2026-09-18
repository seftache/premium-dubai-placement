import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Dubai Jobs | Career & Partner Agency Placement Platform in Dubai",
  description:
    "Emplois Dubai connects qualified talent with licensed partner agencies and employer sponsors across Dubai and the UAE. Submit your profile today.",
  alternates: {
    canonical: "https://emploisdubai.com/en",
    languages: {
      fr: "https://emploisdubai.com",
      en: "https://emploisdubai.com/en",
    },
  },
  openGraph: {
    title: "Dubai Jobs | Career & Partner Agency Placement Platform in Dubai",
    description:
      "Emplois Dubai connects qualified talent with licensed partner agencies and employer sponsors in the UAE.",
    url: "https://emploisdubai.com/en",
  },
};

export default function EnglishHomePage() {
  return (
    <div className="min-h-screen bg-[#060606] text-white">
      {/* ── English Hero Section ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-16 px-6 sm:px-12">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-resort-dubai.png"
            alt="Dubai Luxury Waterfront Skyline"
            fill
            priority
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#060606]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
            <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-brand-gold uppercase">
              Global Placement &amp; Candidate Matching Platform
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
            Unlock Exceptional <br />
            <span className="text-brand-gold">Careers in Dubai</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base font-light text-zinc-300 leading-relaxed font-sans">
            Emplois Dubai connects qualified international candidates with licensed partner agencies and employer sponsors across the United Arab Emirates.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/candidature"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-gold hover:bg-brand-gold-light text-black font-sans text-xs font-bold tracking-[0.15em] uppercase transition-all shadow-[0_0_30px_rgba(201,169,110,0.35)]"
            >
              Submit Candidate Profile →
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 hover:border-brand-gold text-white font-sans text-xs font-semibold tracking-wider uppercase transition-all"
            >
              Explore Sectors
            </Link>
            <Link
              href="/partner/dashboard"
              className="w-full sm:w-auto px-6 py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-brand-gold font-sans text-xs font-semibold tracking-wider uppercase transition-all"
            >
              🏢 Partner Agency Portal
            </Link>
          </div>

          {/* Trust stats */}
          <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 max-w-3xl mx-auto">
            <div>
              <p className="font-serif text-2xl font-bold text-white">100%</p>
              <p className="text-[11px] text-zinc-400 font-sans mt-0.5">Free Profile Submission</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-bold text-brand-gold">Direct</p>
              <p className="text-[11px] text-zinc-400 font-sans mt-0.5">Partner Employer Contact</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-bold text-white">MOHRE</p>
              <p className="text-[11px] text-zinc-400 font-sans mt-0.5">UAE Labor Law Compliant</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-bold text-brand-gold">Privacy</p>
              <p className="text-[11px] text-zinc-400 font-sans mt-0.5">Encrypted Data Transfer</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4-Step Process Section ── */}
      <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] font-sans font-bold tracking-[0.3em] uppercase text-brand-gold">
            Step-by-Step Pathway
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Four Steps to Your New Career in Dubai
          </h2>
          <p className="text-xs text-zinc-400 font-light">
            A transparent and structured pathway from initial submission to arrival in the UAE.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Online Application",
              desc: "Submit your credentials, experience domain, and passport status via our secure form.",
            },
            {
              step: "02",
              title: "Partner Matching",
              desc: "Your profile is reviewed and routed to certified recruitment partners matching your industry.",
            },
            {
              step: "03",
              title: "Interview & Selection",
              desc: "Direct contact with partner employers. Contract terms and visa sponsorship are finalized.",
            },
            {
              step: "04",
              title: "Arrival in Dubai",
              desc: "Onboarding, residency visa issuance, and arrival assistance handled by partner sponsors.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 space-y-4 hover:border-brand-gold/30 transition-all"
            >
              <span className="font-serif text-3xl font-bold text-brand-gold/40">{item.step}</span>
              <h3 className="font-serif text-lg font-bold text-white">{item.title}</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Key Sectors Section ── */}
      <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] font-sans font-bold tracking-[0.3em] uppercase text-brand-gold">
              Industries in High Demand
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">
              Featured Employment Sectors
            </h2>
          </div>
          <Link href="/services" className="text-xs text-brand-gold hover:underline">
            View All Sectors →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              title: "VIP Chauffeuring & Private Fleet",
              desc: "Luxury sedans, hotel transfers, and executive transportation for high-end clientele.",
              icon: "🚗",
            },
            {
              title: "Hospitality, Dining & Palaces",
              desc: "Chefs, senior waiters, mixologists, and front-of-house staff for Michelin-rated venues.",
              icon: "🍽️",
            },
            {
              title: "Executive Security & Facilities",
              desc: "Certified security officers, close protection, and luxury estate surveillance.",
              icon: "🛡️",
            },
          ].map((sec) => (
            <div
              key={sec.title}
              className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 space-y-4 hover:border-white/20 transition-all"
            >
              <span className="text-3xl">{sec.icon}</span>
              <h3 className="font-serif text-lg font-bold text-white">{sec.title}</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">{sec.desc}</p>
              <Link
                href="/candidature"
                className="inline-block text-xs text-brand-gold font-semibold hover:underline pt-2"
              >
                Apply for this sector →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Partner Agencies Call to Action ── */}
      <section className="py-20 px-6 sm:px-12 max-w-5xl mx-auto">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-brand-gold/30 text-center space-y-6 shadow-[0_0_80px_rgba(0,0,0,0.8)]">
          <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-brand-gold">
            B2B Recruitment Partnerships
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Are You a Licensed Agency or Employer in Dubai?
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
            Access pre-screened, verified candidate profiles tailored to your open requisitions. Prepaid candidate balance at $10 USD per qualified transmission with no hidden commissions.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/partner/dashboard"
              className="px-8 py-4 rounded-full bg-brand-gold hover:bg-brand-gold-light text-black font-sans text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(201,169,110,0.3)]"
            >
              Access Partner Portal →
            </Link>
            <Link
              href="/candidature"
              className="px-6 py-4 rounded-full border border-white/10 text-white font-sans text-xs hover:border-white/30 transition-all"
            >
              Candidate Submission Form
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
