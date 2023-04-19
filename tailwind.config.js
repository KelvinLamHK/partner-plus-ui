/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      md: "1250px",
      sm:"705px",
    }, fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      colors: {
        ft: "#004846",
        "ft-light":"#009188",
        title: "#4f575e",
      },
      width: {
        'deflaut':'1250px',
        'table': '1225px',
        'link':'550px',
        'linkEdit':'50px',
      }
    },
  },
  plugins: [require("flowbite/plugin")],
};