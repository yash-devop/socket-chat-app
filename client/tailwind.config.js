/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          avatar: "#D9D9D9",
          blue: "#3491FF",
        },
      },
    },
  },
  plugins: [],
};
