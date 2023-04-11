/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: "rgb(228,109,48)",
        primary: "#FFC44F",
        secondary: "white",
        dark: "#354b66",
        
    },
  },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
