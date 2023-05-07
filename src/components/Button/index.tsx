import type { HTMLAttributes } from "preact/compat";
import type { VariantProps } from "class-variance-authority";
import button from "@components/Button/button.cva";
import { cx } from "class-variance-authority";

interface Props
  extends Omit<HTMLAttributes<HTMLButtonElement>, "class">,
  VariantProps<typeof button> {
  link?: string;
}

const Button = ({ type, className, children, disabled, link, ...rest }: Props) => {
  const classes = cx(button(rest), className);
  return (
    <>
      {link && !disabled ? (
        <a href={link} className={cx(classes, 'p-0')}>
          {children}
        </a>
      ) : (
        <button type={type} class={classes} disabled={disabled} {...rest}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;