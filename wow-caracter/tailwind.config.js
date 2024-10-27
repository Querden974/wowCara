/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    
  ],
  theme: {
    extend: {
      colors:{
        primary : {
          DEFAULT: "#11113A",
        },
        hunter : "#aad372",
        warlock : "#8788EE",
        druid : "#FF7C0A",
        mage : "#3FC7EB",
        deathknight : "#C41E3A",
        demonhunter : "#A330C9",
        monk : "#00FF98",
        priest : "#FFFFFF",
        paladin : "#F48CBA",
        rogue : "#FFF468",
        shaman : "#0070DD",
        warrior : "#C69B6D",
        evoker : "#33937F",

    },},
  },
  plugins: [],
}

