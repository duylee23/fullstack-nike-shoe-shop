/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        bgOrange: '#ff6501',
      },
      textColor: {
        textOrange: '#ff6501',
      }
    },
  },
  variants: {},
  plugins: [],
};