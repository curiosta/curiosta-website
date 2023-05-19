import { FunctionComponent, cloneElement } from "preact";
import DropdownItem from "./DropdownItem";
import type { JSXInternal } from "preact/src/jsx";

type DropdownProps = {
  children: JSXInternal.Element[];
};

const Dropdown: FunctionComponent<DropdownProps> & { Item: typeof DropdownItem } = ({
  children,
}) => {
  const DropdownItemComponents = children.filter((child) => child.type === DropdownItem);

  return (
    <div class="relative inline-block text-left">
      <div>
        <button
          type="button"
          class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          Options
          <svg
            class="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown menu, show/hide based on menu state.
        Entering: "transition ease-out duration-100"
        From: "transform opacity-0 scale-95"
        To: "transform opacity-100 scale-100"
        Leaving: "transition ease-in duration-75"
        From: "transform opacity-100 scale-100"
        To: "transform opacity-0 scale-95" */}
      <div
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        <div class="py-1" role="none">
          {/* Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" */}
          {DropdownItemComponents.map((item, index) =>
            cloneElement(item, {
              // tabIndex: -1,
              key: `menu-item-${index}`,
              role: "menuitem",
            })
          )}
        </div>
      </div>
    </div>
  );
};

Dropdown.Item = DropdownItem;

export default Dropdown;
