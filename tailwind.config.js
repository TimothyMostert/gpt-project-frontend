/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#0D518C",
        secondaryBlue: "#04BFAD",
        primaryOrange: "#F2A341",
        secondaryOrange: "#F27830",
        primaryWhite: "#F2F2F2",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
