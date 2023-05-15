const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        danger: colors.red,
      },
      textColor: {
        primary: colors.gray,
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
