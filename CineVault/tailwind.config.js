import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette"
import { heroui } from "@heroui/react"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["lora", "cursive"],
        sans: ["Exo 2", "sans-serif"],
        fancy: ["Permanent Marker", "cursive"],
        heading: ["Orbitron", "sans-serif"], // Add this modern sci-fi font
      },
      colors: {
        background: "#14181C",
        gold: {
          300: "#ffb3b3", // Light red
          400: "#ff9999", // Medium light red
          500: "#ff8080", // Slightly darker red
        },
      },
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
    },
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {},
        },
        dark: {
          colors: {},
        },
      },
      addCommonColors: true,
    }),
    // Example: Custom plugin using flattenColorPalette if needed
    function ({ addUtilities, theme }) {
      const colors = flattenColorPalette(theme("colors"))
      // You can now use `colors` to create custom utilities if needed
    },
  ],
}
