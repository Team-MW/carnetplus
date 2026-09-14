import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          50: "#E1F5EE",
          100: "#9FE1CB",
          200: "#5DCAA5",
          400: "#1D9E75",
          600: "#0F6E56",
          800: "#085041",
          900: "#04342C",
          DEFAULT: "#0F6E56",
          foreground: "#ffffff",
        },
        warning: {
          50: "#FAEEDA",
          400: "#EF9F27",
          600: "#854F0B",
          900: "#412402",
        },
        danger: {
          50: "#FCEBEB",
          400: "#E24B4A",
          600: "#A32D2D",
          900: "#501313",
        },
        coral: {
          50: "#FAECE7",
          400: "#D85A30",
          600: "#993C1D",
        },
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "6px",
      },
    },
  },
  plugins: [],
};
export default config;
