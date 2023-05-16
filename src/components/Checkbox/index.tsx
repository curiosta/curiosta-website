import type { HTMLAttributes } from "preact/compat";
import { useId } from "preact/hooks";

interface Props extends HTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox = ({ label, ...rest }: Props) => {
  const id = useId();

  return (
    <div class="flex items-center">
      <input
        id={id}
        class="h-4 w-4 rounded border-gray-300 accent-current text-indigo-600 focus:ring-indigo-600"
        {...rest}
      />
      <label for={id} class="ml-3 block text-sm leading-6 text-gray-900">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
