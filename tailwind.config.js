/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // ── COULEURS LOGO — Lino's Food ──────────────────
        brand: {
          DEFAULT: "#842F00",   // brun-rouge profond
          light:   "#A03800",
          dark:    "#5C2000",
          bg:      "#1A0800",   // fond très sombre teinté brand
        },
        gold: {
          DEFAULT: "#FE9922",   // orange-or chaud
          light:   "#FFB55A",
          dark:    "#D97A0A",
          bg:      "#FFF4E0",   // fond très clair
        },
        // ── NEUTRES CHAUDS ───────────────────────────────
        cream: {
          50:  "#FDFAF5", 100: "#F9F3E8", 200: "#F0E3CC",
          300: "#E3CDA8", 400: "#CEB080", 500: "#B5906A",
        },
        ink: {
          50:  "#F5EFE8", 100: "#E8DDD2", 200: "#D0BBA8",
          300: "#B09880", 400: "#8C7560", 500: "#6B5645",
          600: "#4E3E30", 700: "#352A20", 800: "#201810",
          900: "#110C08",
        },
        // ── ACCENT VERT (végétarien) ─────────────────────
        herb: {
          100: "#E1F0D8", 500: "#508C3C", 700: "#325826",
        },
      },

      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        body:    ["'Inter'", "sans-serif"],
        accent:  ["'Cormorant Garamond'", "Georgia", "serif"],
      },

      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      boxShadow: {
        "warm-sm": "0 2px 8px rgba(132,47,0,0.08)",
        "warm-md": "0 4px 20px rgba(132,47,0,0.12), 0 8px 32px rgba(132,47,0,0.07)",
        "warm-lg": "0 8px 32px rgba(132,47,0,0.14), 0 24px 48px rgba(132,47,0,0.09)",
        "warm-xl": "0 16px 48px rgba(132,47,0,0.16), 0 32px 64px rgba(132,47,0,0.10)",
        "brand":   "0 4px 20px rgba(132,47,0,0.25), 0 8px 32px rgba(132,47,0,0.14)",
        "gold":    "0 4px 20px rgba(254,153,34,0.28), 0 8px 32px rgba(254,153,34,0.15)",
      },

      backgroundImage: {
        "gradient-brand":   "linear-gradient(135deg, #842F00 0%, #A03800 60%, #FE9922 100%)",
        "gradient-gold":    "linear-gradient(135deg, #FE9922 0%, #FFB55A 100%)",
        "gradient-hero":    "linear-gradient(to bottom, rgba(17,12,8,0) 0%, rgba(17,12,8,0.45) 50%, rgba(17,12,8,0.88) 100%)",
        "gradient-card":    "linear-gradient(to bottom, rgba(17,12,8,0) 30%, rgba(17,12,8,0.82) 100%)",
        "gradient-warm":    "linear-gradient(135deg, #FDFAF5 0%, #F9F3E8 100%)",
        "gradient-section": "linear-gradient(to bottom, #FDFAF5 0%, #F9F3E8 100%)",
      },

      keyframes: {
        "slide-up": {
          "0%":   { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "slide-up": "slide-up 0.6s cubic-bezier(0.25,0.46,0.45,0.94) both",
        "fade-in":  "fade-in 0.5s ease both",
        "float":    "float 3s ease-in-out infinite",
      },

      height: {
        "screen-90": "90vh",
        "screen-80": "80vh",
      },

      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
      },
    },
  },
  plugins: [],
}
