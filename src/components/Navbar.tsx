"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
interface NavLink {
  label: string;
  href: string;
}

/* ─────────────────────────────────────────
   CONFIG
───────────────────────────────────────── */
const NAV_LINKS: NavLink[] = [
  { label: "ACCUEIL",       href: "/" },
  { label: "SERVICES",      href: "/services" },
  { label: "IMPORT-EXPORT", href: "/import-export" },
];

/* ─────────────────────────────────────────
   LOGO
───────────────────────────────────────── */
function Logo() {
  return (
    <Link 
      href="/" 
      className="flex items-center gap-3.5 shrink-0 group transition-transform duration-300 hover:scale-[1.02]"
      aria-label="Emplois Dubai"
    >
      {/* Diamond icon */}
      <svg width="34" height="34" viewBox="0 0 28 28" fill="none" aria-hidden="true" className="drop-shadow-lg">
        <polygon
          points="14,1 27,14 14,27 1,14"
          stroke="url(#logoGold)"
          strokeWidth="1.2"
          fill="none"
        />
        <polygon
          points="14,6 22,14 14,22 6,14"
          fill="url(#logoGold)"
          opacity="0.18"
        />
        <defs>
          <linearGradient id="logoGold" x1="1" y1="1" x2="27" y2="27">
            <stop offset="0%"   stopColor="#d4a853" />
            <stop offset="50%"  stopColor="#f0ce80" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
        </defs>
      </svg>

      {/* Word-mark */}
      <div className="flex flex-col leading-tight">
        <span className="text-white text-base sm:text-[17px] font-bold tracking-widest uppercase drop-shadow-md">
          EMPLOIS
        </span>
        <span
          className="text-[12px] sm:text-[13px] font-light tracking-[0.25em] uppercase"
          style={{ color: "#d4a853" }}
        >
          DUBAI
        </span>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────
   DESKTOP NAV LINKS
───────────────────────────────────────── */
function DesktopLinks({ current }: { current: string }) {
  return (
    <nav className="hidden lg:flex items-center gap-10" aria-label="Navigation principale">
      {NAV_LINKS.map((link) => {
        const active = current === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`
              relative text-[11px] font-medium tracking-[0.18em] transition-colors duration-300
              after:absolute after:bottom-0 after:left-0 after:h-px after:w-0
              after:bg-amber-400 after:transition-all after:duration-300
              hover:text-white hover:after:w-full
              ${active ? "text-white after:w-full" : "text-zinc-400"}
            `}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

/* ─────────────────────────────────────────
   CTA BUTTON
───────────────────────────────────────── */
function CTAButton() {
  return (
    <div className="hidden lg:block shrink-0">
      <Link
        href="/candidature"
        className="
          group inline-flex items-center gap-2
          border border-white/20 hover:border-[#d4a853]
          bg-transparent hover:bg-[#d4a853]
          text-white hover:!text-zinc-950
          transition-all duration-300 rounded-sm
          text-[10px] tracking-widest font-semibold uppercase
          px-5 py-2.5
        "
      >
        CANDIDATURE
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          &#10230;
        </span>
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────
   HAMBURGER BUTTON
───────────────────────────────────────── */
function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      id="mobile-menu-toggle"
      onClick={onClick}
      aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
      aria-expanded={open}
      className="lg:hidden relative z-50 flex flex-col gap-[5px] p-2"
    >
      <motion.span
        animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
        transition={{ duration: 0.28 }}
        className="block h-px w-6 bg-white"
      />
      <motion.span
        animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="block h-px w-6 bg-white"
      />
      <motion.span
        animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
        transition={{ duration: 0.28 }}
        className="block h-px w-6 bg-white"
      />
    </button>
  );
}

/* ─────────────────────────────────────────
   MOBILE MENU
───────────────────────────────────────── */
function MobileMenu({
  open,
  current,
  onClose,
}: {
  open: boolean;
  current: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/97 backdrop-blur-2xl lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <nav className="flex flex-col items-center gap-10">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={`
                    font-serif text-3xl tracking-wider transition-colors duration-300
                    ${current === link.href ? "text-amber-400" : "text-white/80 hover:text-white"}
                  `}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.08, duration: 0.4 }}
              className="mt-4"
            >
              <Link
                href="/candidature"
                onClick={onClose}
                className="border border-amber-500/40 bg-amber-500/10 px-8 py-3 text-sm font-semibold tracking-[0.2em] uppercase text-amber-400 hover:bg-amber-500/20 transition-colors duration-300"
              >
                CANDIDATURE VIP &#10230;
              </Link>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────── */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Close menu on route change */
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  /* Lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* Detect scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);
  const closeMenu  = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/60 shadow-lg shadow-black/20' : 'bg-zinc-950/50 backdrop-blur-md border-b border-zinc-900/40'}`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 h-16 lg:h-20 flex items-center justify-between relative">
          <Logo />
          <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center">
            <DesktopLinks current={pathname} />
          </div>
          <CTAButton />
          <Hamburger open={menuOpen} onClick={toggleMenu} />
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} current={pathname} onClose={closeMenu} />
    </>
  );
}
