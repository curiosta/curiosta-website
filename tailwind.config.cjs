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
      keyframes: {
        "mini-expand": {
          from: {
            opacity: 0,
            transform: "scale(0.95)",
          },
          to: {
            opacity: 1,
            transform: "scale(1)",
          },
        },
        "mini-shrink": {
          from: {
            opacity: 1,
            transform: "scale(1)",
          },
          to: {
            opacity: 0,
            transform: "scale(0.95)",
          },
        },
      },
      fontWeight: {
        medium: "501",
      },
    },
    animation: {
      "mini-expand": "mini-expand 150ms linear forwards",
      "mini-shrink": "mini-shrink 150ms linear forwards",
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
