import user from "@api/user";
import Button from "@components/Button";
import Typography from "@components/Typography";
import { useSignal } from "@preact/signals";
import type { ChangeEvent } from "preact/compat";
import Radio from "@components/Radio";
import AddressForm from "@components/AddressForm";

const AddressCard = () => {
  const currentCustomer = user.customer.value;
  const selectedAddressId = useSignal<string | null>("");
  const isNewAddress = useSignal<boolean>(true);

  const handleSelectAddress = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.currentTarget;
    // console.log(value, checked);
    if (checked) {
      selectedAddressId.value = value;
      isNewAddress.value = false;
    }
  };

  return (
    <div>
      <fieldset>
        <legend class="text-base font-semibold leading-6 text-gray-900">
          Select Shipping Address
        </legend>

        <div class="my-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
          <Button
            type="button"
            variant="icon"
            onClick={() => (
              (isNewAddress.value = true), (selectedAddressId.value = null)
            )}
            className={`flex justify-center items-center bg-white  rounded-lg border ${
              isNewAddress.value
                ? " border-indigo-600 ring-2 ring-indigo-600"
                : ""
            }
       `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-10 stroke-primary-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Button>
          {currentCustomer?.shipping_addresses.length
            ? currentCustomer.shipping_addresses.map((customer) => (
                <label
                  class={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none ${
                    selectedAddressId.value === customer.id
                      ? " border-indigo-600 ring-2 ring-indigo-600"
                      : ""
                  } `}
                >
                  <Radio
                    name="address"
                    value={customer.id}
                    className="sr-only"
                    onChange={handleSelectAddress}
                  />
                  <span class="flex flex-1">
                    <span class="flex flex-col">
                      <Typography
                        size="body2/medium"
                        variant="primary"
                        className="block "
                      >
                        {`${customer.first_name} ${customer.last_name}`}
                      </Typography>
                      <Typography
                        size="body2/normal"
                        variant="secondary"
                        className="mt-1 flex items-center "
                      >
                        {`${customer?.address_1}, ${customer.city}, ${customer.postal_code}`}
                      </Typography>

                      <Typography
                        size="body2/normal"
                        variant="secondary"
                        className="mt-1 flex items-center "
                      >
                        {customer.phone}
                      </Typography>
                    </span>
                  </span>
                  {/* <!-- Not Checked: "invisible" --> */}
                  <svg
                    class={`h-5 w-5 text-indigo-600 ${
                      selectedAddressId.value === customer.id
                        ? "block"
                        : "hidden"
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </label>
              ))
            : ""}
        </div>
      </fieldset>
      <div
        class={`${
          isNewAddress.value || selectedAddressId.value === null
            ? "block"
            : "hidden"
        }`}
      >
        <AddressForm />
      </div>
    </div>
  );
};

export default AddressCard;
