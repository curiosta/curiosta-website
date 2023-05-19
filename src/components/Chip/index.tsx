import { cx } from "class-variance-authority"
import chip from "./chip.cva"
import type { ComponentChildren } from "preact"

type ChipProps = {
  children: ComponentChildren;
}

const Chip = ({ children }: ChipProps) => {
  const classes = cx(chip());
  return (
    <div className={classes}>{children}</div>
  )
}

export default Chip