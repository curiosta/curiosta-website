import { Listbox, Transition } from '@headlessui/react';
import { useSignal } from '@preact/signals';
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { cx } from 'class-variance-authority';
import { ComponentChildren, Fragment } from 'preact';
import type { FC, HTMLAttributes } from 'preact/compat';

function classNames(...classes: string[]) {
  return classes.filter((c) => c).join(' ');
}

type TOption = {
  id: string;
  label: string;
  value: string;
  avatar?: string;
  adornment?: ComponentChildren;
};

type TSelectProps = {
  label?: string;
  options: TOption[];
  defaultValue: string;
  selectProps?: HTMLAttributes<HTMLSelectElement>;
  className?: string;
  disabled?: boolean;
};

const Select: FC<TSelectProps> = ({
  label,
  options,
  className,
  disabled,
  defaultValue
}) => {
  const activeOption = useSignal<string | undefined>(defaultValue);
  return (
    <>
      <Listbox
        disabled={disabled} onChange={(selected) => activeOption.value = selected}>
        {({ open, disabled: itemDisabled }: { open: boolean, disabled: boolean }) => {
          const selectedOption = options.find(o => o.value === activeOption.value)
          return (
            <div>
              {label ? (
                <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                  {label}
                </Listbox.Label>
              ) : null}
              <div className={cx(`relative mt-1`, className)}>
                <Listbox.Button
                  className={cx(
                    'relative w-full cursor-default rounded-md py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 sm:text-sm sm:leading-6',
                    selectedOption?.avatar && 'ml-3',
                    itemDisabled ? 'bg-gray-100' : undefined
                  )}
                  tabIndex={itemDisabled ? -1 : undefined}>
                  <span className="flex items-center">
                    {selectedOption ? (
                      <>
                        {selectedOption.avatar ? (
                          <img
                            src={selectedOption?.avatar}
                            alt=""
                            className="h-5 w-5 flex-shrink-0 rounded-full"
                          />
                        ) : null}
                        {selectedOption?.adornment && !selectedOption.avatar ? (
                          <div className="mr-1">{selectedOption.adornment}</div>
                        ) : null}
                        <span className="ml-0 font-normal block truncate">
                          {selectedOption?.label}
                        </span>
                      </>
                    ) : null}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-gray-400">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                    </svg>
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <Listbox.Options className="absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {options.map((option) => (
                      <Listbox.Option
                        key={option.id}
                        className={({ active }) =>
                          classNames(
                            active ? 'bg-primary-600 text-white' : 'text-gray-900',
                            'relative cursor-default select-none py-2 pl-3 pr-9'
                          )
                        }
                        value={option.value}>
                        {({ selected, active }: { selected: boolean, active: boolean }) => (
                          <>
                            <div className="flex items-center">
                              {option.avatar ? (
                                <img
                                  src={option.avatar}
                                  alt=""
                                  className="h-5 w-5 flex-shrink-0 rounded-full"
                                />
                              ) : null}
                              <span
                                className={classNames(
                                  selected ? 'font-semibold' : 'font-normal',
                                  'ml-3 block truncate'
                                )}>
                                {option.label}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-primary-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                )}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </div>
          );
        }}
      </Listbox>
    </>
  );
};

export default Select;
