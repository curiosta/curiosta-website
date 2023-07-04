import { cx } from "class-variance-authority"
import type { FunctionalComponent } from "preact"
import type { HTMLAttributes } from "preact/compat"

type TDropdownItemProps = Omit<HTMLAttributes<HTMLButtonElement>, 'class'> & {
  label?: string,
  noHoverEffects?: boolean
}

const DropdownItem: FunctionalComponent<TDropdownItemProps> = ({ children, className, label, noHoverEffects, ...props }) => {
  return (
    <button type="button" class={cx(`text-gray-700 block px-4 py-2 text-sm transition-colors ease-out duration-100 w-full text-left`, !noHoverEffects ? `hover:bg-gray-100 hover:text-gray-900 cursor-pointer` : undefined, className)} {...props}>{label || children}</button>
  )
}

export default DropdownItem