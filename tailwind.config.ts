import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        primaryAccent: "#2E68DD",
        secondaryAccent: "#212F52",
        primaryBg: "#020315",
        secondaryBg: "#454A5C",
      },
      spacing: {
        wrapperWidth: "clamp(16rem, 93vw, 75rem)",
        wrapperPadding: "clamp(1.09rem, 1rem + 0.47vw, 1.33rem)",
      },
      animation: {
        "spin-slow": "spin 50s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
