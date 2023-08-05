import type { Address } from "@medusajs/medusa";
import Typography from "@components/Typography";
import type { Signal } from "@preact/signals";
import type { ChangeEvent } from "preact/compat";
import Radio from "@components/Radio";
import { cx } from "class-variance-authority";
import countriesMap from "@utils/countriesMap";
import region from "@api/region";

interface Props {
  address: Address;
  selectedAddressId: Signal<string | null | undefined>;
  isLoading: Signal<boolean>;
  handleSelectAddress: (e: ChangeEvent<HTMLInputElement>) => void;
  deleteAddress: (id: string) => Promise<void>;
}

const AddressCard = ({
  address,
  selectedAddressId,
  handleSelectAddress,
  isLoading,
}: Props) => {
  const disabled =
    isLoading.value ||
    region.selectedCountry.value?.iso_2 !== address.country_code;

  const addressInfo = [
    address.address_1,
    address.address_2,
    address.city,
    address.province,
    address && countriesMap[address.country_code as keyof typeof countriesMap],
    address.postal_code,
  ];

  return (
    <label
      class={cx(
        `relative flex w-52 h-full min-h-[10rem] cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none focus:ring-primary-600 focus:ring-2`,
        selectedAddressId.value === address.id &&
          "border-primary-600 ring-2 ring-primary-600",
        disabled && "!bg-gray-100"
      )}
    >
      <Radio
        name="address"
        className="sr-only"
        value={address.id}
        onClick={handleSelectAddress}
        disabled={disabled}
      />
      <span class="flex flex-1">
        <span class="flex flex-col">
          <Typography
            size="body2/medium"
            variant="primary"
            className={cx(disabled && `!text-gray-400`)}
          >
            {`${address.first_name} ${address.last_name}`}
          </Typography>
          <Typography
            size="body2/normal"
            variant="secondary"
            className={cx(
              `mt-1 flex items-center`,
              disabled && `!text-gray-400`
            )}
          >
            {addressInfo.filter((i) => i).join(", ")}
          </Typography>
          <Typography
            size="body2/normal"
            variant="secondary"
            className={cx(
              "mt-1 flex items-center",
              disabled && `!text-gray-400`
            )}
          >
            Phone: {address.phone}
          </Typography>
        </span>
      </span>

      {selectedAddressId.value === address.id ? (
        <>
          {/* selected address check mark */}
          <svg
            class={`h-5 w-5 absolute top-4 right-4 text-app-primary-600 ${
              selectedAddressId.value === address.id ? "block" : "hidden"
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
        </>
      ) : // <Button type='button' onClick={() => deleteAddress(address.id)} variant='icon' className='absolute top-4 right-4 !p-0'>
      //   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 stroke-danger-600">
      //     <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      //   </svg>
      // </Button>
      null}
    </label>
  );
};

export default AddressCard;
