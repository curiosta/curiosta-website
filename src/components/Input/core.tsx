import Typography from "@components/Typography";
import { cx } from "class-variance-authority";
import type { ComponentChildren, FunctionComponent } from "preact";
import { forwardRef, type HTMLAttributes } from "preact/compat";
import { useEffect, useId, useRef } from "preact/hooks";
import './input.css';
import type {
  FieldError,
  RegisterOptions,
  UseControllerProps,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";

export type BaseInputProps = Omit<
  HTMLAttributes<HTMLInputElement>,
  | "name"
  | "class"
  | "pattern"
  | "required"
  | "minLength"
  | "maxLength"
  | "disabled"
> & {
  leftAdornment?: ComponentChildren | ComponentChildren[];
  rightAdornment?: ComponentChildren | ComponentChildren[];
  label?: string;
  rules?: UseControllerProps["rules"];
  validator?: (value: string) => string | true;
  name?: string;
};

export type InputCoreProps = BaseInputProps &
  Omit<RegisterOptions, "validate" | "maxLength" | "minLength"> & {
    error?: FieldError;
  };

const InputCore: FunctionComponent<InputCoreProps> = forwardRef<HTMLInputElement, InputCoreProps>(({
  label,
  rules,
  leftAdornment,
  rightAdornment,
  className,
  disabled,
  placeholder,
  required,
  error,
  ...props
}, ref) => {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current?.value) {
      // we need to get the input's value on initial page load since browsers can autofill the form before the javascript gets executed
      props.onChange?.({ target: { value: inputRef.current.value } })
    }
  }, []);

  if (ref) (ref as any)(inputRef.current)

  return (
    <div className="w-full">
      {label ? (
        <label
          htmlFor={id}
          className="text-sm font-medium leading-6 text-gray-900 flex gap-1 mb-1"
        >
          {label}
          {(rules?.required || required) ? <Typography variant="error">*</Typography> : ""}
        </label>
      ) : null}
      <div className={cx(`flex rounded-md`, (leftAdornment || rightAdornment) && error ? 'ring-2 ring-danger-600' : '')}>
        {leftAdornment ? (
          <span className={cx(`inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm`)}>
            {leftAdornment}
          </span>
        ) : null}
        <input
          id={id}
          disabled={disabled}
          ref={inputRef}
          className={twMerge(cx(
            `block w-full rounded-md border-0 p-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 focus-visible:outline-none`,
            leftAdornment ? "rounded-l-none" : "rounded-l-md",
            rightAdornment ? "rounded-r-none" : "rounded-r-md",
            !error ? 'focus:ring-2 focus:ring-inset focus:ring-primary-600' : '',
            className
          ))}
          placeholder={placeholder || label || ""}
          {...props}
          pattern={undefined}
          required={false}
          readOnly={props.readOnly}
        />
        {rightAdornment || null}
      </div>
      {error ? <Typography variant='error'> {error.message} </Typography> : null}
    </div>
  );
});

export default InputCore;
