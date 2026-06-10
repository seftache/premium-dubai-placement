import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-black pt-20 pb-10 border-t border-zinc-900/60 z-20">
      
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 bottom-0 h-[250px] w-[450px] -translate-x-1/2 translate-y-1/2 rounded-full bg-brand-gold/[0.02] blur-[90px]" />

      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-1">
            <Link href="/" className="group flex items-center gap-3 mb-6">
              <div className="relative flex h-8 w-8 items-center justify-center">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
                  <path d="M20 2L38 20L20 38L2 20L20 2Z" stroke="#c9a96e" strokeWidth="1.5" fill="none" />
                  <path d="M20 8L32 20L20 32L8 20L20 8Z" fill="#c9a96e" opacity="0.15" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-white/90 group-hover:text-brand-gold transition-colors duration-300">
                  Emplois
                </span>
                <span className="text-[8px] font-sans tracking-[0.35em] uppercase text-brand-gold/70">
                  Dubai
                </span>
              </div>
            </Link>
            <p className="text-xs font-sans font-light leading-relaxed text-white/40 max-w-xs">
              Votre conciergerie d&apos;élite pour une carrière exceptionnelle aux Émirats Arabes Unis. Placement, visa, et accompagnement intégral.
            </p>
          </div>

          {/* Navigation Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-gold mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-sm text-white/50 hover:text-white transition-colors duration-300">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-white/50 hover:text-white transition-colors duration-300">
                  Nos Domaines
                </Link>
              </li>
              <li>
                <Link href="/candidature" className="text-sm text-white/50 hover:text-white transition-colors duration-300">
                  Postuler
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-gold mb-6">Légal</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/mentions-legales" className="text-sm text-white/50 hover:text-white transition-colors duration-300">
                  Mentions Légales
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-sm text-white/50 hover:text-white transition-colors duration-300">
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/conditions-generales" className="text-sm text-white/50 hover:text-white transition-colors duration-300">
                  Conditions Générales
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-gold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li>
                <span className="block text-white/70 font-medium">Adresse</span>
                Dubaï Marina, UAE
              </li>
              <li>
                <span className="block text-white/70 font-medium">WhatsApp Directrice</span>
                <a href="https://wa.me/971526252539" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300 flex items-center gap-2">
                  +971 52 625 2539
                </a>
              </li>
            </ul>
          </div>

        </div>
        <div className="mt-16 border-t border-white/[0.08] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <p className="text-[10px] text-white/30 font-light tracking-wider">
              &copy; {new Date().getFullYear()} Emplois Dubaï. Tous droits réservés.
            </p>
            {/* SEO Stealth Links */}
            <div className="flex gap-4 text-[9px] text-white/10 uppercase tracking-widest">
              <Link href="/guides/emploi-serveur-dubai" className="hover:text-white/30 transition-colors">Emploi Serveur</Link>
              <Link href="/guides/visa-travail-dubai" className="hover:text-white/30 transition-colors">Visa Dubaï</Link>
            </div>
          </div>
          <p className="text-[10px] text-white/30 font-light tracking-wider">
            Designed &amp; Developed by <a href="https://gadjico.netlify.app" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors duration-300 underline underline-offset-4 font-medium">Gadjico</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}
