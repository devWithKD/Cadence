/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
      },
    },
  },
  plugins: [
    // eslint-disable-next-lin no-undef
    require("@tailwindcss/typography"),
  ],
};
