// /** @type {import('tailwindcss').Config} */
// const { heroui } = require("@heroui/react");
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         display: ["lora", "cursive"], 
//         sans: ["Exo 2", "sans-serif"], 
//         fancy: ["Permanent Marker", "cursive"], 
//       },
//       colors: {
//         background: "#14181C", 
//       },
//     },
//   },
//   darkMode: "class",
//   plugins: [
//     heroui({
//       themes: {
//         light: {
//           // ...
//           colors: {},
//         },
//         dark: {
//           // ...
//           colors: {},
//         },
//         // ... custom themes
//       },
//       addCommonColors: true,
//     }),
//   ],
// }


import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import { heroui } from "@heroui/react";

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
      },
      colors: {
        background: "#14181C",
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
      const colors = flattenColorPalette(theme("colors"));
      // You can now use `colors` to create custom utilities if needed
    },
  ],
};
