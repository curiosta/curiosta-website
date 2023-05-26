import useLocalStorage from "@hooks/useLocalStorage";
import type { Region } from "@medusajs/medusa";
import { useSignal } from "@preact/signals";

interface Props {
  regions: Region[];
  screen?: "mobile";
}

const ShipmentRegions = ({ regions, screen }: Props) => {
  const { set, get } = useLocalStorage();
  const localCartId = get("cartId");
  const disabled = localCartId?.length ? localCartId?.length > 0 : false;
  const countries = regions?.map((region) => region.countries).flat(1);

  const localRegion = get<{
    id?: string;
    curr_code?: string;
    countryId?: number;
    countryCode?: string;
  }>("region");

  const selectedRegion = {
    id: useSignal(localRegion?.id),
    curr_code: useSignal(localRegion?.curr_code),
    countryId: useSignal(localRegion?.countryId ?? countries[0].id),
    countryCode: useSignal(localRegion?.countryCode),
  };

  selectedRegion.curr_code.value =
    regions.find((region) =>
      region?.countries
        .map((item) => item.id)
        .includes(selectedRegion?.countryId.value)
    )?.currency_code || regions[0].currency_code;

  selectedRegion.id.value =
    countries.find((country) => country.id === selectedRegion.countryId.value)
      ?.region_id || localRegion?.id;

  selectedRegion.countryCode.value =
    countries.find((country) => country.id === selectedRegion.countryId.value)
      ?.iso_2 || countries[0].iso_2;

  set("region", {
    id: selectedRegion.id.value,
    countryId: selectedRegion.countryId.value,
    curr_code: selectedRegion.curr_code.value,
    countryCode: selectedRegion.countryCode.value,
  });

  return (
    <div
      class={`${screen === "mobile" ? "flex" : "hidden"
        } lg:flex items-center gap-2`}
    >
      <select
        id="location"
        name="location"
        className=" block rounded-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={(e) => {
          selectedRegion.countryId.value = parseInt(e.currentTarget.value);
          location.reload();
        }}
        value={selectedRegion.countryId.value}
        disabled={disabled}
        title={disabled ? "clear cart before change country" : "select country"}
      >
        {countries?.map((country) => (
          <option value={country.id}>{country.name}</option>
        ))}
      </select>
    </div>
  );
};

export default ShipmentRegions;
