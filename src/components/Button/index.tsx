import type { HTMLAttributes } from "preact/compat";
import type { VariantProps } from "class-variance-authority";
import button from "@components/Button/button.cva";
import { cx } from "class-variance-authority";

interface Props
  extends Omit<HTMLAttributes<HTMLButtonElement>, "class">,
    VariantProps<typeof button> {}

const Button = ({ type, className, children, ...rest }: Props) => {
  return (
    <button type={type} class={cx(button(rest), className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
