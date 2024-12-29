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
        color1: "#A7D477",
        color2: "#E7FBB4",
        color3: "#DF6D2D",
        color4: "#C84C05",
        color5: "#213555"
      },
    },
  },
  plugins: [],
} satisfies Config;
