/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      boxShadow: {
        cbs: "5px 5px 0px 0px #000000",
      },
    },
  },
  plugins: [],
};
