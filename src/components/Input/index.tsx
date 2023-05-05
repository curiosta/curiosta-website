import type { HTMLAttributes } from "preact/compat";

interface Props extends HTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, ...rest }: Props) => {
  const id = label.replaceAll(" ", "-").toLowerCase();

  return (
    <div>
      <label for={id} class="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>

      <input
        id={id}
        class="block w-full rounded-md border-0 mt-2 p-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        {...rest}
      />
    </div>
  );
};

export default Input;
