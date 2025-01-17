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
        primary: "#002A70",
        secondary: "#F05100",
        secondaryAccent: "#F08100",
        background: "#EFEFEF",
        gold: "#B59410",
        silver: "#71706E",
        bronze: "#804A00",
      },
    },
  },
  plugins: [],
} satisfies Config;
