import { VariantProps, cx } from "class-variance-authority"
import chip from "./chip.cva"
import type { ComponentChildren } from "preact"
import type { HTMLAttributes } from "preact/compat";

type ChipProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & VariantProps<typeof chip> & {
  children: ComponentChildren;
}

const Chip = ({ children, className, ...props }: ChipProps) => {
  const classes = cx(chip(props), className);
  return (
    <div className={classes}>{children}</div>
  )
}

export default Chip