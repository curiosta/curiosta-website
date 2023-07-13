import { FunctionComponent, cloneElement } from "preact";
import DropdownItem from "./DropdownItem";
import type { JSXInternal } from "preact/src/jsx";
import { useSignal } from "@preact/signals";
import DropdownDivider from "./DropdownDivider";
import { useEffect, useRef } from "preact/hooks";
import Select from "@components/Select";

type DropdownProps = {
  children: (JSXInternal.Element | null)[];
  title?: string;
};

type DropdownElements = {
  Item: typeof DropdownItem,
  Divider: typeof DropdownDivider,
}

const Dropdown: FunctionComponent<DropdownProps> & DropdownElements = ({
  children,
  title = 'Options'
}) => {
  const isDropdownOpen = useSignal<boolean | undefined>(undefined);
  const dropdownRef = useRef<HTMLDivElement>(null)
  const DropdownElements = children.filter((child) => [DropdownDivider, DropdownItem, Select].includes(child?.type as any));

  useEffect(() => {
    const clickAwayListener = (e: MouseEvent) => {
      if (dropdownRef.current?.contains(e.target as any) || isDropdownOpen.value === undefined) return;
      isDropdownOpen.value = false
    }

    window.addEventListener('click', clickAwayListener)

    return () => {
      window.removeEventListener('click', clickAwayListener)
    }
  }, []);

  return (
    <div class="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => isDropdownOpen.value = !isDropdownOpen.value}
        >
          {title}
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
      <div
        class={`absolute ${isDropdownOpen.value !== undefined && (isDropdownOpen.value ? 'animate-mini-expand' : 'animate-mini-shrink')} ${!isDropdownOpen.value && 'pointer-events-none'} opacity-0 scale-95 right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        <div class="py-1" role="none">
          {DropdownElements.map((item, index) =>
            item &&
            cloneElement(item, {
              tabIndex: isDropdownOpen.value ? item.props.tabIndex : -1,
              key: `menu-item-${index}`,
              role: "menuitem",
            })
          ).filter(i => !!i)}
        </div>
      </div>
    </div>
  );
};

Dropdown.Item = DropdownItem;
Dropdown.Divider = DropdownDivider;

export default Dropdown;
