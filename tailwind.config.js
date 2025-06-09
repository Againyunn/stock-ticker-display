/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        wooridaumB: ["var(--font-wooridaumB)"],
        wooridaumL: ["var(--font-wooridaumL)"],
        wooridaumR: ["var(--font-wooridaumR)"],
      },
    },
  },
  safelist: ["text-[70px]"],
  plugins: [],
};
