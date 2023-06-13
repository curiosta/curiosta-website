import cart from "@api/cart";

// select india default | temporary
import "@api/region";

import { cx } from "class-variance-authority";
import region from "@api/region";
import { useSignal } from "@preact/signals";
interface Props {
  screen?: "mobile";
}

const ShipmentRegions = ({ screen }: Props) => {
  const selectedCountry = useSignal<null | number>(null);

  if (selectedCountry.value === null && region.selectedCountry.value) {
    selectedCountry.value = region.selectedCountry.value?.id;
  }

  return (
    <div
      class={cx(`lg:flex items-center gap-2`, screen === "mobile" ? "flex" : "hidden")}
    >
      <select
        id="location"
        className="block rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-primary-600 sm:text-sm sm:leading-6"
        onChange={async (e) => {
          if (!cart.store.value) return e.preventDefault();

          const countryIdStr = e.currentTarget.value
          let countryId = Number(countryIdStr)
          if (Number.isNaN(countryId)) {
            return;
          }

          const cartItemsLength = cart.store.value.items.length;
          if (cartItemsLength) {
            const answer = confirm(
              "Changing country will clear cart items, Do you still want to proceed?"
            );
            if (answer) {
              selectedCountry.value = countryId;
              await cart.resetCartId();
              await region.setCountry(countryId)
            } else {
              e.currentTarget.value = `${selectedCountry.value || ``}`
            }
          } else {
            selectedCountry.value = countryId
            await region.setCountry(countryId)
          }
        }}
        value={selectedCountry.value || undefined}
      >
        {region.countries.value?.map((country) => (
          <option value={country.id} key={country.id}>{country.name}</option>
        ))}
      </select>
    </div>
  );
};

export default ShipmentRegions;
