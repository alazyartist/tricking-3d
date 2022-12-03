/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./pages/**/*.{js,ts,jsx,tsx,html}",
    "./components/**/*.{js,ts,jsx,tsx,html}",
    "./app/**/*.{js,ts,jsx,tsx,html}",
    "*.{html,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter"],
        virgil: ["Virgil"],
        titan: ["Titan One"],
      },
    },
  },
  plugins: [],
};
