import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#0A0A0A",
        "text-primary": "#0A0A0A",
        "text-secondary": "#4A4A4A",
        border: "#E5E5E5",
        hover: "#2A2A2A",
      },
      fontFamily: {
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.2" }],
        h1: ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.2" }],
        h2: ["clamp(1.5rem, 3vw, 2rem)", { lineHeight: "1.2" }],
        body: ["clamp(1rem, 1.5vw, 1.125rem)", { lineHeight: "1.6" }],
      },
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "2rem",
        lg: "4rem",
        xl: "8rem",
        "2xl": "12rem",
      },
      maxWidth: {
        content: "65ch",
        wide: "1440px",
        ultra: "1920px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      aspectRatio: {
        "3/2": "3 / 2",
        "4/5": "4 / 5",
      },
    },
  },
  plugins: [],
};

export default config;
