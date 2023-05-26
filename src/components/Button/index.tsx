import { ForwardedRef, HTMLAttributes, forwardRef } from "preact/compat";
import type { VariantProps } from "class-variance-authority";
import button from "@components/Button/button.cva";
import { cx } from "class-variance-authority";

interface Props
  extends Omit<HTMLAttributes<HTMLButtonElement>, "class">,
  VariantProps<typeof button> {
  link?: string;
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(({ type, className, children, disabled, link, ...rest }, ref) => {
  const classes = cx(button(rest), className);
  return (
    <>
      {link && !disabled ? (
        <a href={link} ref={ref as ForwardedRef<HTMLAnchorElement>} className={cx(classes, 'p-0')}>
          {children}
        </a>
      ) : (
        <button type={type} ref={ref as ForwardedRef<HTMLButtonElement>} class={classes} disabled={disabled} {...rest}>
          {children}
        </button>
      )}
    </>
  );
});

export default Button;
