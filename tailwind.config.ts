import type { Config } from "tailwindcss";


const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        pool: {
          // Locked triad: black #0A0A0A · navy #0B2545 · turquoise #1EC8C1
          50: "#f0fafa",
          100: "#d5f3f1",
          200: "#a8e5e1",
          300: "#6dd4ce",
          400: "#3fc9c2",
          500: "#1EC8C1",
          600: "#159e98",
          700: "#0d7874",
          800: "#0B2545",
          900: "#0B2545",
          950: "#0A0A0A",
        },
        sand: {
          50: "#fdfbf6",
          100: "#faf5ea",
          200: "#f3e9d2",
          300: "#e9d8ae",
          400: "#dcc07f",
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(11, 37, 69, 0.25)",
      },
      backgroundImage: {
        "pool-gradient":
          "linear-gradient(145deg, #0A0A0A 0%, #0B2545 55%, #0e6e6a 100%)",
        "wave-pattern":
          "radial-gradient(circle at 20% 20%, rgba(30,200,193,0.18) 0%, transparent 40%), radial-gradient(circle at 80% 60%, rgba(30,200,193,0.12) 0%, transparent 45%)",
      },
    },
  },
  plugins: [],
};
export default config;
