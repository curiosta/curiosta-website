import type { HTMLAttributes } from "preact/compat";
import type { VariantProps } from "class-variance-authority";
import button from "@components/Button/button.cva";

interface Props
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

const Button = ({ type, children, variant, ...rest }: Props) => {
  return (
    <button type={type} class={button({ variant })} {...rest}>
      {children}
    </button>
  );
};

export default Button;
