import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        background2: "var(--color-background2)",
        foreground: "var(--color-foreground)",
        card: "var(--color-card)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        muted: "var(--color-muted)",
        subtle: "var(--color-subtle)",
        faint: "var(--color-faint)",
        "on-primary": "var(--color-on-primary)",
        "scrollbar-track": "var(--color-scrollbar-track)",
        "scrollbar-thumb": "var(--color-scrollbar-thumb)",
        accent: {
          DEFAULT: "var(--color-primary)",
          dark: "#2563EB",
        },
      },
      boxShadow: {
        "card-glow": "0 4px 15px rgba(59, 130, 246, 0.2)",
        "card-hover": "0 8px 30px rgba(0, 163, 255, 0.3)",
      },
    },
  },
  plugins: [
    daisyui,
    lineClamp,
  ],
};

