import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      /* Brand tokens. Every value resolves to a variable in styles/theme.css —
         no colour is defined here, only named. */
      colors: {
        bg: "var(--bg)",
        surface: {
          DEFAULT: "var(--surface)",
          raised: "var(--surface-raised)",
        },
        ink: {
          DEFAULT: "var(--text-primary)",
          muted: "var(--text-muted)",
        },
        brand: {
          DEFAULT: "var(--accent)",
          bright: "var(--accent-bright)",
          deep: "var(--accent-deep)",
        },

        /* shadcn/ui primitives read these. Mapped onto the same palette. */
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        border: "var(--border)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent-hsl) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        md: "var(--radius)",
        lg: "var(--radius-lg)",
        pill: "var(--radius-pill)",
      },
      fontFamily: {
        sans: ["Google Sans Flex", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      },
      /* Global ~13% type reduction for a more refined, enterprise scale.
         Each step is shrunk but keeps its default line-height, so line boxes
         (and therefore vertical spacing) stay put — only the glyphs get
         smaller, and the hierarchy between steps is preserved exactly. */
      fontSize: {
        xs: ["0.65rem", { lineHeight: "1rem" }],
        sm: ["0.76rem", { lineHeight: "1.25rem" }],
        base: ["0.875rem", { lineHeight: "1.5rem" }],
        lg: ["0.98rem", { lineHeight: "1.75rem" }],
        xl: ["1.09rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.3rem", { lineHeight: "2rem" }],
        "3xl": ["1.63rem", { lineHeight: "2.25rem" }],
        "4xl": ["1.96rem", { lineHeight: "2.5rem" }],
        "5xl": ["2.6rem", { lineHeight: "1" }],
        "6xl": ["3.26rem", { lineHeight: "1" }],
        "7xl": ["3.9rem", { lineHeight: "1" }],
        "8xl": ["5.2rem", { lineHeight: "1" }],
        "9xl": ["6.95rem", { lineHeight: "1" }],
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
