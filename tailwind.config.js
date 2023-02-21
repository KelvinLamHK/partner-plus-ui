/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      md: "1204px",
    }, fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      colors: {
        ft: "#ef4123",
        "ft-dark":"#dc2e10",
        title: "#4f575e",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};