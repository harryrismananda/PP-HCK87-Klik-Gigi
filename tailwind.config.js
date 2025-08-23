/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./views/**/*.ejs"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
   daisyui: {
    themes: ["light", "dark", "cupcake"], // choose your themes
    darkTheme: "dark",                   // default dark theme
    base: true,
    styled: true,
    utils: true,
    logs: true,
  },
}

