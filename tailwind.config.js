import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        card: "var(--color-card)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
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
  plugins: [daisyui, lineClamp], 
};

