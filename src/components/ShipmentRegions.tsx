import { activeCountry, regions, updateRegionByCountryId } from "@api/region/regionList";
import { signal } from "@preact/signals";
import { cart, resetCart } from "@store/cartStore";
import { useEffect } from "preact/hooks";
// select india default | temporary
import "@api/region/regionList";

interface Props {
  screen?: "mobile";
}

const selectedCountry = signal<number | undefined>(undefined);
const ShipmentRegions = ({ screen }: Props) => {
  const countries = regions.value?.map((region) => region.countries).flat(1);

  useEffect(() => {
    selectedCountry.value = activeCountry.value?.id;
  }, [activeCountry.value]);

  if (!activeCountry.value) return null;
  return (
    <div
      class={`${screen === "mobile" ? "flex" : "hidden"
        } lg:flex items-center gap-2`}
    >
      <select
        id="location"
        className=" block rounded-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={async (e) => {
          if (!cart.value) return;
          const cartItemsLength = cart.value.items.length;

          if (cartItemsLength) {
            const answer = confirm(
              "Changing region will clear cart items, Do you still want to proceed?"
            );
            if (answer) {
              await resetCart();
            }
          }
          await updateRegionByCountryId(
            cart.value.id,
            Number(e.currentTarget?.value)
          );
          selectedCountry.value = Number(e.currentTarget.value);
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
