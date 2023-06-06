/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#0D518C",
        secondaryBlue: "#04BFAD",
        primaryOrange: "#F2A341",
        secondaryOrange: "#F27830",
        primaryWhite: "#F2F2F2",
        secondaryWhite: "#E5E5E5",
        primaryBlack: "#333333",
        secondaryBlack: "#4F4F4F",
      },
      backgroundImage: {
        "palm-tree": "url('/src/assets/images/tiled-palm-trees.png')",
        'location-1': "url('/src/assets/images/tiled-travel-vibes.png')",
        'travel-1': "url('/src/assets/images/tiled-travel-lines.png')",
        'create-trip': "url('/src/assets/images/tiled-create-trip.png')",
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
  purge: {
    options: {
      safelist: [
        // TravelStyle
        'bg-gray-500',
        'text-gray-900',
        'bg-rose-400',
        'text-rose-900',
        'bg-green-300',
        'text-green-900',
        'bg-indigo-400',
        'text-indigo-900',
        
        // Budget
        'bg-blue-400',
        'text-blue-900',
        'bg-orange-400',
        'text-orange-900',
        'bg-red-400',
        'text-red-900',
        'bg-amber-400',
        'text-amber-900',
      
        // ActivityType
        'bg-red-300',
        'text-red-900',
        'bg-blue-300',
        'text-blue-900',
        'bg-gray-300',
        'text-gray-900',
        'bg-yellow-300',
        'text-yellow-900',
        'bg-orange-300',
        'text-orange-900',
        'bg-green-400',
        'text-green-900',
        'bg-indigo-300',
        'text-indigo-900',
        'bg-teal-300',
        'text-teal-900',
        'bg-purple-300',
        'text-purple-900',
        'bg-pink-300',
        'text-pink-900',
        'bg-rose-300',
        'text-rose-900',
        'bg-fuchsia-300',
        'text-fuchsia-900',
        'bg-amber-300',
        'text-amber-900',
        'bg-lime-300',
        'text-lime-900',
        'bg-emerald-300',
        'text-emerald-900',
        'bg-cyan-300',
        'text-cyan-900',
        'bg-blue-400',
        'text-blue-900',
        
        // TravelDuration
        'bg-red-500',
        'text-red-900',
        "bg-orange-400",
        "bg-amber-500",
        "text-amber-900",
        "bg-emerald-500",
        "text-emerald-900",
        "bg-blue-500",
        "text-blue-900",

        "bg-cyan-400",
        "text-cyan-900",
      ]
    }
  },
};
