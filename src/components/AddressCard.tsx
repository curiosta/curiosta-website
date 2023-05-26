import type { Address } from "@medusajs/medusa";
import Typography from "@components/Typography";
import type { Signal } from "@preact/signals";
import type { ChangeEvent } from "preact/compat";
import Radio from "@components/Radio";
import useLocalStorage from "@hooks/useLocalStorage";

interface Props {
  customer: Address;
  selectedAddressId: Signal<string | null>;
  isLoading: Signal<boolean>;
  handleSelectAddress: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AddressCard = ({
  customer,
  selectedAddressId,
  isLoading,
  handleSelectAddress,
}: Props) => {
  const { get } = useLocalStorage();
  const localRegion = get<{ countryCode: string }>("region");

  const disabled =
    isLoading.value || customer.country_code !== localRegion?.countryCode;

  return (
    <div
      title={
        customer.country_code !== localRegion?.countryCode
          ? "country not match with local region"
          : ""
      }
    >
      <label
        class={`relative flex w-52 cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none ${selectedAddressId.value === customer.id
            ? " border-indigo-600 ring-2 ring-indigo-600"
            : ""
          }  ${disabled ? "opacity-80" : "opacity-100"}`}
      >
        <Radio
          name="address"
          value={customer.id}
          className="sr-only"
          onChange={handleSelectAddress}
          disabled={disabled}
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
              {`${customer?.address_1}, ${customer.city}, ${customer.postal_code} `}
            </Typography>

            <Typography
              size="body2/normal"
              variant="secondary"
              className="mt-1 flex items-center "
            >
              country code: {customer.country_code}
            </Typography>
            <Typography
              size="body2/normal"
              variant="secondary"
              className="mt-1 flex items-center "
            >
              Phone: {customer.phone}
            </Typography>
          </span>
        </span>
        {/* <!-- Not Checked: "invisible" --> */}
        <svg
          class={`h-5 w-5 text-indigo-600 ${selectedAddressId.value === customer.id ? "block" : "hidden"
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
    </div>
  );
};

export default AddressCard;
