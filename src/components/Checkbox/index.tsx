import { cx } from "class-variance-authority";
import type { HTMLAttributes } from "preact/compat";
import { useId } from "preact/hooks";

interface Props extends Omit<HTMLAttributes<HTMLInputElement>, "class"> {
  label?: string;
}

const Checkbox = ({ label, className, ...rest }: Props) => {
  const id = useId();

  return (
    <div class="flex items-center">
      <input
        type="checkbox"
        id={id}
        class={cx(
          "h-4 w-4 rounded border-gray-300 text-app-primary-600 focus:ring-primary-600",
          className
        )}
        {...rest}
      />
      {label ? (
        <label
          for={id}
          class="ml-3 block text-sm leading-6 text-gray-900 cursor-pointer"
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default Checkbox;
