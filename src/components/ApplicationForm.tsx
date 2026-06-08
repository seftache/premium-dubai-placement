"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Link from "next/link";

interface FormData {
  fullName: string;
  whatsapp: string;
  expertise: string;
  passport: string;
  motivation?: string;
  cv?: File | null;
}

interface FormErrors {
  fullName?: string;
  whatsapp?: string;
  expertise?: string;
  passport?: string;
  motivation?: string;
  cv?: string;
}

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

type SubmitState = "idle" | "submitting" | "success" | "error";

const FORM_FIELDS = {
  fullName: {
    id: "fullName",
    label: "Nom complet",
    type: "text",
    placeholder: "Ex: Jean Dupont",
    autocomplete: "name",
    minLength: 2,
  },
  whatsapp: {
    id: "whatsapp",
    label: "Numéro WhatsApp",
    type: "tel",
    placeholder: "Ex: +33 6 12 34 56 78",
    autocomplete: "tel",
    pattern: /^\+?[\d\s\-()]{7,20}$/, 
  },
  expertise: {
    id: "expertise",
    label: "Domaine souhaité",
    placeholder: "Sélectionnez votre domaine",
  },
  passport: {
    id: "passport",
    label: "Passeport valide ?",
    placeholder: "Sélectionnez une option",
  },
} as const;

const EXPERTISE_OPTIONS: SelectOption[] = [
  { value: "", label: "Sélectionner votre domaine", disabled: true },
  { value: "chauffeur", label: "Chauffeur" },
  { value: "restauration-cuisine", label: "Restauration / Cuisine" },
  { value: "securite", label: "Sécurité" },
  { value: "btp", label: "Métiers du BTP" },
  { value: "personnel-maison-menage", label: "Personnel de Maison / Ménage" },
  { value: "autre", label: "Autre" },
];

const PASSPORT_OPTIONS: SelectOption[] = [
  { value: "", label: "Sélectionner", disabled: true },
  { value: "oui", label: "Oui — Passeport valide" },
  { value: "non", label: "Non — Pas encore de passeport" },
  { value: "en-cours", label: "En cours de renouvellement" },
];

const SUBMIT_DURATION = 2200;
const RESPONSE_DELAY = 48;

const ANIMATION = {
  header: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  },
  card: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  },
  error: {
    hidden: { opacity: 0, y: -4, height: 0 },
    visible: { opacity: 1, y: 0, height: "auto" },
    exit: { opacity: 0, y: -4, height: 0 },
  },
} as const;

const VALIDATION_MESSAGES = {
  fullName: {
    required: "Veuillez indiquer votre nom complet",
    tooShort: "Le nom doit contenir au moins 2 caractères",
  },
  whatsapp: {
    required: "Numéro WhatsApp requis pour vous contacter",
    invalid: "Format invalide (ex: +33 6 12 34 56 78)",
  },
  expertise: {
    required: "Veuillez sélectionner votre domaine d'expertise",
  },
  passport: {
    required: "Veuillez indiquer votre situation de passeport",
  },
  motivation: {
    tooLong: "La motivation ne doit pas dépasser 500 caractères",
  },
} as const;

const VALIDATION_RULES = {
  fullName: (value: string): string | null => {
    if (!value.trim()) return VALIDATION_MESSAGES.fullName.required;
    if (value.trim().length < 2) return VALIDATION_MESSAGES.fullName.tooShort;
    return null;
  },
  whatsapp: (value: string): string | null => {
    if (!value.trim()) return VALIDATION_MESSAGES.whatsapp.required;
    if (!FORM_FIELDS.whatsapp.pattern.test(value.trim())) return VALIDATION_MESSAGES.whatsapp.invalid;
    return null;
  },
  expertise: (value: string): string | null => {
    if (!value) return VALIDATION_MESSAGES.expertise.required;
    return null;
  },
  passport: (value: string): string | null => {
    if (!value) return VALIDATION_MESSAGES.passport.required;
    return null;
  },
};

const INPUT_BASE_CLASSES =
  "peer block w-full min-h-[3.2rem] bg-transparent px-4 pb-2 pt-6 font-sans text-sm font-light text-white/90 outline-none transition-all duration-300 border-b disabled:opacity-40 disabled:cursor-not-allowed placeholder:text-white/20";

const SELECT_BASE_CLASSES =
  "peer block w-full min-h-[3.2rem] appearance-none bg-transparent px-4 pb-2 pt-6 pr-10 font-sans text-sm font-light outline-none transition-all duration-300 border-b disabled:opacity-40 disabled:cursor-not-allowed [&>option]:bg-brand-black [&>option]:text-white/90 [&>option]:py-2";

const FIELD_FALLBACK_STYLE = {
  minHeight: "3.2rem",
  paddingTop: "1.5rem",
  paddingBottom: "0.5rem",
};

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  (Object.keys(VALIDATION_RULES) as Array<keyof typeof VALIDATION_RULES>).forEach((field) => {
    const error = VALIDATION_RULES[field](data[field] as string);
    if (error) errors[field] = error;
  });

  return errors;
}

function useApplicationForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    whatsapp: "",
    expertise: "",
    passport: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const updateField = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setSubmitState("submitting");

    try {
      const domaineLabel = EXPERTISE_OPTIONS.find(opt => opt.value === formData.expertise)?.label || formData.expertise;
      const passportLabel = formData.passport === "oui" ? "Oui" : "Non";
      
      const message = `📥 *NOUVELLE CANDIDATURE DUBAI*

• *Nom complet :* ${formData.fullName}
• *WhatsApp :* ${formData.whatsapp}
• *Domaine recherché :* ${domaineLabel}
• *Passeport valide :* ${passportLabel}
• *Option choisie :* Paiement Échelonné (Acompte 500k)

Bonjour, je viens de voir vos offres sur la plateforme Emplois Dubaï et je souhaite lancer ma procédure.`;

      const whatsappUrl = `https://wa.me/971526252539?text=${encodeURIComponent(message)}`;
      
      // Open WhatsApp in a new window immediately in response to user click
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

      await new Promise((resolve) => setTimeout(resolve, SUBMIT_DURATION));

      if (process.env.NODE_ENV === "development") {
        console.log("📋 Candidature soumise:", formData);
      }

      setSubmitState("success");
    } catch (error) {
      console.error("Erreur de soumission:", error);
      setSubmitState("error");
      setTimeout(() => setSubmitState("idle"), 3000);
    }
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData({
      fullName: "",
      whatsapp: "",
      expertise: "",
      passport: "",
    });
    setErrors({});
    setSubmitState("idle");
  }, []);

  return {
    formData,
    errors,
    submitState,
    updateField,
    handleSubmit,
    resetForm,
  };
}

function FloatingInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  error,
  disabled,
  autocomplete,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string;
  disabled?: boolean;
  autocomplete?: string;
  onChange: (value: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="group relative">
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? placeholder : ""}
          autoComplete={autocomplete || "off"}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${INPUT_BASE_CLASSES} ${
            error
              ? "border-amber-500/40"
              : focused
              ? "border-brand-gold/50"
              : "border-white/[0.08]"
          }`}
          style={FIELD_FALLBACK_STYLE}
        />

        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-4 font-sans transition-all duration-300 ease-out ${
            isActive ? "top-1.5 text-[10px] tracking-[0.15em] uppercase" : "top-4 text-sm tracking-wide"
          } ${
            error
              ? "text-amber-500/60"
              : focused
              ? "text-brand-gold/70"
              : "text-white/40"
          }`}
        >
          {label}
        </label>

        <motion.div
          initial={false}
          animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute bottom-0 left-0 h-[1px] w-full origin-center bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
          aria-hidden="true"
        />

        <motion.div
          initial={false}
          animate={{ opacity: focused ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute -bottom-1 left-1/2 h-4 w-3/4 -translate-x-1/2 bg-brand-gold/[0.04] blur-xl"
          aria-hidden="true"
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            variants={ANIMATION.error}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="mt-2 flex items-center gap-1.5 font-sans text-[11px] tracking-wide text-amber-500/70"
            role="alert"
          >
            <svg
              className="h-3 w-3 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function FloatingSelect({
  id,
  label,
  value,
  options,
  error,
  disabled,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: SelectOption[];
  error?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="group relative">
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${SELECT_BASE_CLASSES} ${
            error
              ? "border-amber-500/40"
              : focused
              ? "border-brand-gold/50"
              : "border-white/[0.08]"
          } ${value === "" && !focused ? "text-transparent" : "text-white/90"}`}
          style={FIELD_FALLBACK_STYLE}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled} style={{ backgroundColor: '#0a0a0a', color: option.disabled ? '#666' : '#e0e0e0', padding: '8px' }}>
              {option.label}
            </option>
          ))}
        </select>

        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-4 font-sans transition-all duration-300 ease-out ${
            isActive ? "top-1.5 text-[10px] tracking-[0.15em] uppercase" : "top-4 text-sm tracking-wide"
          } ${
            error
              ? "text-amber-500/60"
              : focused
              ? "text-brand-gold/70"
              : "text-white/40"
          }`}
        >
          {label}
        </label>

        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
          <svg
            className={`h-4 w-4 transition-colors duration-300 ${focused ? "text-brand-gold/60" : "text-white/15"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <motion.div
          initial={false}
          animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute bottom-0 left-0 h-[1px] w-full origin-center bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
          aria-hidden="true"
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            variants={ANIMATION.error}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="mt-2 flex items-center gap-1.5 font-sans text-[11px] tracking-wide text-amber-500/70"
            role="alert"
          >
            <svg
              className="h-3 w-3 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col items-center py-12 text-center sm:py-16"
      role="alert"
      aria-live="polite"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "backOut" }}
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-brand-gold/20 bg-brand-gold/[0.06]"
      >
        <motion.svg
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          className="h-7 w-7 text-brand-gold"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </motion.svg>
      </motion.div>

      <h3 className="mb-3 font-serif text-2xl font-semibold text-white sm:text-3xl">
        Candidature <span className="text-gold-gradient">envoyée</span>
      </h3>
      <p className="mb-8 max-w-sm font-sans text-sm font-light leading-relaxed text-white/40">
        Merci pour votre confiance. Notre équipe analysera votre profil sous {RESPONSE_DELAY}h et vous contactera via WhatsApp.
      </p>

      <div className="flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={onReset}
          className="font-sans text-xs font-light tracking-[0.15em] uppercase text-white/30 transition-colors duration-300 hover:text-brand-gold/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50 rounded-sm px-4 py-2"
        >
          Soumettre une autre candidature
        </button>
        <Link
          href="/services"
          className="font-sans text-[10px] font-light tracking-[0.2em] uppercase text-white/20 transition-colors duration-300 hover:text-brand-gold/50"
        >
          Découvrir nos services →
        </Link>
      </div>
    </motion.div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <motion.div
      key="error"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="flex flex-col items-center py-12 text-center"
      role="alert"
      aria-live="assertive"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/[0.06]">
        <svg className="h-5 w-5 text-amber-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <h3 className="mb-2 font-serif text-xl font-semibold text-white">Erreur d&apos;envoi</h3>
      <p className="mb-6 max-w-sm font-sans text-sm font-light text-white/40">
        Une erreur est survenue. Veuillez réessayer.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="font-sans text-xs font-medium tracking-[0.15em] uppercase text-brand-gold/70 hover:text-brand-gold transition-colors"
      >
        Réessayer
      </button>
    </motion.div>
  );
}

function SubmitButton({ state }: { state: SubmitState }) {
  const isLoading = state === "submitting";

  return (
    <motion.button
      type="submit"
      disabled={isLoading}
      whileTap={{ scale: isLoading ? 1 : 0.985 }}
      className={`
        cta-button group relative w-full overflow-hidden border px-8 py-5 font-sans text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300
        ${isLoading
          ? "cursor-wait border-brand-gold/20 bg-brand-gold/10 text-brand-gold/50"
          : "border-brand-gold bg-brand-gold text-brand-black hover:bg-brand-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
        }
      `}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center gap-3"
          >
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="32" strokeLinecap="round" className="opacity-30" />
              <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Envoi en cours…
          </motion.span>
        ) : (
          <motion.span
            key="default"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center gap-3"
          >
            Soumettre ma candidature
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function ApplicationFormContent({
  formData,
  errors,
  submitState,
  updateField,
  handleSubmit,
  resetForm,
}: ReturnType<typeof useApplicationForm>) {
  return (
    <AnimatePresence mode="wait">
      {submitState === "success" ? (
        <SuccessState onReset={resetForm} />
      ) : submitState === "error" ? (
        <ErrorState onRetry={() => resetForm()} />
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          noValidate
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
          aria-label="Formulaire de candidature"
        >
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-6">
            <FloatingInput
              id={FORM_FIELDS.fullName.id}
              label={FORM_FIELDS.fullName.label}
              type={FORM_FIELDS.fullName.type}
              placeholder={FORM_FIELDS.fullName.placeholder}
              autocomplete={FORM_FIELDS.fullName.autocomplete}
              value={formData.fullName}
              error={errors.fullName}
              onChange={(value) => updateField("fullName", value)}
            />
            <FloatingInput
              id={FORM_FIELDS.whatsapp.id}
              label={FORM_FIELDS.whatsapp.label}
              type={FORM_FIELDS.whatsapp.type}
              placeholder={FORM_FIELDS.whatsapp.placeholder}
              autocomplete={FORM_FIELDS.whatsapp.autocomplete}
              value={formData.whatsapp}
              error={errors.whatsapp}
              onChange={(value) => updateField("whatsapp", value)}
            />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-6">
            <FloatingSelect
              id={FORM_FIELDS.expertise.id}
              label={FORM_FIELDS.expertise.label}
              value={formData.expertise}
              options={EXPERTISE_OPTIONS}
              error={errors.expertise}
              onChange={(value) => updateField("expertise", value)}
            />
            <FloatingSelect
              id={FORM_FIELDS.passport.id}
              label={FORM_FIELDS.passport.label}
              value={formData.passport}
              options={PASSPORT_OPTIONS}
              error={errors.passport}
              onChange={(value) => updateField("passport", value)}
            />
          </div>

          <div className="pt-2">
            <SubmitButton state={submitState} />
          </div>

          <p className="text-center font-sans text-[10px] font-light leading-relaxed text-white/20">
            En soumettant ce formulaire, vous acceptez que vos données soient traitées par Emplois Dubaï dans le cadre de votre candidature. Vos informations restent strictement confidentielles.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export function ApplicationForm() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-60px 0px" });
  const form = useApplicationForm();

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-dark"
      aria-labelledby="application-heading"
      id="candidature"
    >
      {/* ======= VIDÉO DE FOND 4K NATIVE (SANS YOUTUBE, SANS CHARGEMENT) ======= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/dubai-pure-4k.jpg"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover opacity-80"
        >
          <source src="/dubai-video.mp4" type="video/mp4" />
        </video>
        {/* Voile sombre pour lisibilité optimale du texte blanc */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/95 via-brand-black/70 to-brand-black/30" />
        <div className="absolute inset-0 bg-brand-black/20" />
      </div>

      {/* ======= CONTENEUR PRINCIPAL CENTRÉ AVEC PADDING MASSIF ======= */}
      <div 
        className="relative z-10 w-full max-w-[1500px] mx-auto py-32 flex flex-col lg:flex-row items-center gap-16 xl:gap-24"
        style={{ paddingLeft: 'clamp(2rem, 8vw, 8rem)', paddingRight: 'clamp(2rem, 8vw, 8rem)' }}
      >
        
        {/* ======= COLONNE GAUCHE : Texte éditorial ======= */}
        <div className="w-full lg:w-1/2">
          <motion.div
            ref={sectionRef}
            variants={ANIMATION.header}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            className="relative"
          >
            <span 
              className="mb-6 inline-block text-[11px] font-sans font-bold tracking-[0.3em] uppercase text-brand-gold drop-shadow-md"
            >
              Processus de sélection
            </span>
            <h1 
              id="application-heading" 
              className="mb-8 font-serif text-5xl font-bold text-white sm:text-6xl lg:text-7xl leading-[1.05] drop-shadow-xl"
            >
              L&apos;excellence <br className="hidden sm:block" />
              <span className="text-gold-gradient drop-shadow-md">n&apos;attend pas.</span>
            </h1>
            
            <div className="gold-separator mb-8" aria-hidden="true" style={{ width: '80px', height: '2px', background: 'linear-gradient(90deg, #d4a853, transparent)' }} />
            
            <p className="max-w-lg font-sans text-sm font-light leading-relaxed text-zinc-300 sm:text-base mb-12 drop-shadow-md">
              Rejoignez l&apos;élite des professionnels à Dubaï. Notre agence sélectionne rigoureusement les meilleurs talents pour des placements sur-mesure de très haut niveau, incluant l&apos;intégralité des démarches administratives.
            </p>

            {/* Espace explicite pour séparer le texte des avantages */}
            <div className="h-8 sm:h-10" aria-hidden="true" />

            {/* Réassurances / Features (Editorial Design) */}
            <div className="flex flex-col gap-8">
              {[
                { id: "01", title: "Réponse en 48h", desc: "Analyse experte et strictement confidentielle." },
                { id: "02", title: "Accompagnement VIP", desc: "Prise en charge intégrale visa et logistique." },
                { id: "03", title: "Discrétion Absolue", desc: "Protection totale de vos données." }
              ].map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.6, delay: 0.5 + (idx * 0.15) }}
                  className="flex items-start gap-5 group"
                >
                  <div className="font-serif text-sm font-semibold text-brand-gold/80 transition-colors duration-500 group-hover:text-brand-gold">
                    {feature.id} <span className="opacity-40">/</span>
                  </div>
                  <div className="-mt-1">
                    <h4 className="font-serif text-lg font-medium text-white tracking-wide drop-shadow-md">{feature.title}</h4>
                    <p className="mt-1 font-sans text-xs font-light tracking-wide text-white/50 drop-shadow-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ======= COLONNE DROITE : Le formulaire (Card) ======= */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <motion.div
            variants={ANIMATION.card}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            className="w-full max-w-[500px] relative overflow-hidden rounded-2xl border border-white/[0.15] bg-brand-black/50 backdrop-blur-xl p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          >
            <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-brand-gold/[0.08] blur-[80px]" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-brand-gold/[0.06] blur-[80px]" aria-hidden="true" />

            <div className="pointer-events-none absolute left-0 top-0 h-12 w-[1px] bg-gradient-to-b from-brand-gold/60 to-transparent" aria-hidden="true" />
            <div className="pointer-events-none absolute left-0 top-0 h-[1px] w-12 bg-gradient-to-r from-brand-gold/60 to-transparent" aria-hidden="true" />
            <div className="pointer-events-none absolute right-0 bottom-0 h-12 w-[1px] bg-gradient-to-t from-brand-gold/60 to-transparent" aria-hidden="true" />
            <div className="pointer-events-none absolute right-0 bottom-0 h-[1px] w-12 bg-gradient-to-l from-brand-gold/60 to-transparent" aria-hidden="true" />

            <div className="relative z-10 mb-10 text-center">
              <h2 className="font-serif text-2xl font-semibold text-white mb-2" id="application-heading">
                Soumettre un profil
              </h2>
              <p className="font-sans text-xs font-light text-white/70">Tous les champs sont obligatoires.</p>
            </div>

            <div className="relative z-10">
              <ApplicationFormContent {...form} />
            </div>
          </motion.div>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-brand-black z-10 pointer-events-none" />
    </section>
  );
}
