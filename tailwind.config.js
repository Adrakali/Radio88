/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      sans: ["Bebas neue", "sans-serif"],
      body: ["Karla", "sans-serif"],
    },
    boxShadow: {
      sm: "5px 5px 0px 0px #000000",
    },
    extend: {
      colors: {
        dbrown: "#3d2414",
        mbrown: "#603d27",
        primary: "#fbb131",
        accent: "#790027",
        lbrown: "#fff8dc",
      },
      gridTemplateColumns: {
        fbcard: "0.5fr 1fr",
      },
    },
  },
  plugins: [],
};
