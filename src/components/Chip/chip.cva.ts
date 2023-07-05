import { cva } from "class-variance-authority";

const chip = cva('relative z-10 rounded-full px-3 py-1.5 font-medium transition-colors', {
  variants: {
    variant: {
      primary: ['bg-primary-600/95', 'text-white', 'hover:bg-primary-600/100'],
      default: ['bg-gray-50', 'text-gray-900', 'hover:bg-gray-100'],
      primary2: ['bg-primary-600/10', 'text-app-primary-600', 'text-sm', 'font-medium', 'flex items-center justify-center', 'rounded-md', 'p-0']
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

export default chip;