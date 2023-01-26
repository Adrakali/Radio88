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
      sm: "2px 2px 0px 0px #000000",
      md: "5px 5px 0px 0px #000000",
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
        header: "auto 1fr",
        fbcard: "0.75fr 1fr",
      },
    },
  },
  plugins: [],
};
