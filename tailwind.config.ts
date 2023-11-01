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
    },
  },
  plugins: [],
};
export default config;
