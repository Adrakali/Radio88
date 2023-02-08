/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    fontFamily: {
      sans: ["Bebas neue", "sans-serif"],
      body: ["Karla", "sans-serif"],
    },
    boxShadow: {
      sm: "2px 2px 0px 0px #000000",
      md: "-16px 16px 0px 0px #000000",
    },
    extend: {
      fontSize: {
        h1: "var(--step-5)",
        h2: "var(--step-4)",
        h3: "var(--step-3)",
        h4: "var(--step-2)",
        h5: "var(--step-1)",
        p: "var(--step-0)",
      },
      colors: {
        primary: {
          DEFAULT: "#fbb131",
          300: "#FFFBF5",
          500: "#E5A12D",
        },
        dbrown: "#3d2414",
        mbrown: "#603d27",
        accent: "#790027",
        lbrown: "#fff8dc",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
