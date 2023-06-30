const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        danger: colors.red,
        secondray: colors.white,
        success: colors.green,
      },
      textColor: {
        primary: colors.gray,
        "app-primary": colors.indigo,
        disabled: colors.gray[400],
        success: colors.green,
      },
      screens: {
        xs: "380px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
