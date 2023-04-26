import type { HTMLAttributes } from "preact/compat";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  btnLabel: string;
}

const Button = ({ btnLabel, ...rest }: Props) => {
  return <button {...rest}>{btnLabel}</button>;
};

export default Button;
