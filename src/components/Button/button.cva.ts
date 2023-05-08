import { cva } from "class-variance-authority";

const button = cva(
  "inline-flex justify-center  rounded-md  text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
  {
    variants: {
      variant: {
        primary: [
          "bg-primary-600",
          "focus:bg-primary-600",
          "hover:bg-primary-600",
          "disabled:bg-primary-200",
          "disabled:pointer-events-none",
          "disabled:select-none",
          "focus-visible:outline-primary-600",
          "text-white",
          "py-3 px-8 w-full",
        ],
        danger: [
          "bg-danger-600",
          "focus:bg-danger-600",
          "hover:bg-danger-600",
          "focus-visible:outline-danger-600",
          "text-white",
        ],
        icon: [
          "bg-transparent",
          "!rounded-full w-8 h-8 items-center justify-center flex border border-gray-400",
        ],
        "icon-active": [
          "bg-primary-600",
          "text-white",
          "fill-white",
          "!rounded-full w-8 h-8 items-center justify-center flex border border-gray-400",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export default button;