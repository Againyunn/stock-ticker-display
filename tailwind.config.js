/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/styles/**/*.{css,scss,sass,less,styl}",
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
  safelist: [],
  plugins: [],
};
