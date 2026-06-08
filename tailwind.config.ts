import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0a0a0a",
          dark: "#111111",
          charcoal: "#1a1a1a",
          gold: "#c9a96e",
          "gold-light": "#d4b97a",
          "gold-dark": "#b8954f",
          silver: "#c0c0c0",
          cream: "#f5f0e8",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
        "shimmer": "shimmer 2.5s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(201, 169, 110, 0.15)" },
          "50%": { boxShadow: "0 0 40px rgba(201, 169, 110, 0.35)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
