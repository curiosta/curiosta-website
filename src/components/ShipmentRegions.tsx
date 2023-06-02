import { activeCountry, regions, updateRegionByCountryId } from "@api/region/regionList";
import { signal } from "@preact/signals";
import cart from "@api/cart";
import { useEffect } from "preact/hooks";

// select india default | temporary
import "@api/region/regionList";
import { cx } from "class-variance-authority";

interface Props {
  screen?: "mobile";
}

const selectedCountry = signal<number | undefined>(undefined);
const ShipmentRegions = ({ screen }: Props) => {
  const countries = regions.value?.map((region) => region.countries).flat(1);
  useEffect(() => {
    selectedCountry.value = activeCountry.value?.id;
  }, [activeCountry.value]);

  return (
    <div
      class={cx(`lg:flex items-center gap-2`, screen === "mobile" ? "flex" : "hidden")}
    >
      <select
        id="location"
        className="block rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-primary-600 sm:text-sm sm:leading-6"
        onChange={async (e) => {
          if (!cart.store.value) return;
          const countryIdStr = e.currentTarget.value
          const cartItemsLength = cart.store.value.items.length;

          if (cartItemsLength) {
            const answer = confirm(
              "Changing country will clear cart items, Do you still want to proceed?"
            );
            if (answer) {
              await cart.resetCartId();
            }
          }

          let countryId = Number(countryIdStr)
          if (Number.isNaN(countryId)) {
            return;
          }

          await updateRegionByCountryId(
            countryId
          );

          Number(countryId);
        }}
        value={selectedCountry.value}
      >
        {countries?.map((country) => (
          <option value={country.id}>{country.name}</option>
        ))}
      </select>
    </div>
  );
};

export default ShipmentRegions;
