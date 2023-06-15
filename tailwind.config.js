/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EEEEEE",
        secondary: "#F1FFFA",
        tertiary: "#8257E6",
        red: "#AD343E",
        gray: "#747274",
      },
      fontFamily: {
        custom: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
