import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#27445D",
        secondary: "#F05100",
        secondaryAccent: "#F08100",
        background: "#EFEFEF",
        text: "#2c3d4f",
        gold: "#B59410",
        silver: "#71706E",
        bronze: "#804A00",
      },
      backgroundImage: {
        simBg: "url('/sim-bg.jpg')",
      },
    },
  },
  plugins: [],
} satisfies Config;
