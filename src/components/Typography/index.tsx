import { cx } from "class-variance-authority";

const variantsMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subheading1: "h6",
  subheading2: "h6",
  body1: "p",
  body2: "p",
} as const;

const typographyVariants = {
  h1: "text-6xl font-bold",
  h2: "text-5xl font-bold",
  h3: "text-4xl font-bold",
  h4: "text-3xl font-bold",
  h5: "text-2xl font-bold",
  h6: "text-1xl font-bold",
  subheading1: "text-1xl font-bold",
  subheading2: "text-1xl font-semibold",
  body1: "text-base",
  body2: "text-base font-bold",
  link: "text-xs text-primaryViolet uppercase underline font-bold",
};

export type TypographyProps = {
  variant?: keyof typeof variantsMapping;
  className?: string;
  children: string;
};

const Typography = ({
  variant = "body1",
  children,
  className,
  ...props
}: TypographyProps) => {
  const Component = variantsMapping[variant];
  return (
    <Component class={cx(typographyVariants[variant], className)} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
