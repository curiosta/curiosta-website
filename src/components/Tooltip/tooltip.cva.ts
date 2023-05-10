import { cva } from "class-variance-authority";

const tooltipPlacement = cva(``, {
  variants: {
    placement: {
      bottom: ['last:translate-y-full'],
      top: ['last:hover:-translate-y-full',]
    }
  }
})

export default tooltipPlacement