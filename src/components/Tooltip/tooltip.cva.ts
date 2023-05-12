import { cva } from "class-variance-authority";

const tooltip = cva(`
opacity-100
w-full
max-w-xs
bg-black
text-white
text-center
text-xs
rounded-lg
py-2
absolute
z-10
transition-all
group-hover:opacity-100
bottom-full
ml-14
px-3
pointer-events-none`, {
  variants: {
    placement: {
      bottom: [''],
    }
  }
})

export default tooltip