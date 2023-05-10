import { cva } from "class-variance-authority";

const typography = cva("", {
  variants: {
    variant: {
      primary: ["text-primary-900"],
      secondary: ["text-primary-600"],
      button: ["text-white font-semibold"],
      error: ["text-xs text-danger-600"],
    },
    size: {
      h1: "text-6xl",
      h2: "text-5xl",
      h3: "text-4xl",
      h4: "text-3xl",
      h5: "text-2xl",
      h6: "text-xl",
      subheading: "text-xl",
      body1: "text-base",
      body2: "text-sm",
      small: 'text-xs'
    },
    weight: {
      light: ["font-thin"],
      normal: ["font-normal"],
      medium: ["font-medium"],
      bold: ["font-bold"],
    },
    disabled: {
      true: ["text-neutral-400 italic"],
    },
  },
  defaultVariants: {
    size: "body1",
    weight: "normal",
  },
});

export default typography;
