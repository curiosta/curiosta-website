import type { Regions } from "@api/region/index.d";
import useLocalStorage from "@hooks/useLocalStorage";
import { useSignal } from "@preact/signals";

interface Props {
  regions: Regions[];
}

const ShipmentRegions = ({ regions }: Props) => {
  const { set, get } = useLocalStorage();
  const countries = regions?.map((region) => region.countries).flat(1);
  const localRegion = get("region");
  const selectedRegion = {
    id: useSignal(localRegion?.id ?? countries[0].region_id),
    curr_code: useSignal(localRegion?.curr_code ?? ""),
  };

  selectedRegion.curr_code.value = regions.find(
    (region) => region?.id === selectedRegion?.id.value
  )?.currency_code;

  set("region", {
    id: selectedRegion.id.value,
    curr_code: selectedRegion.curr_code.value,
  });

  return (
    <div class="hidden lg:flex items-center gap-2">
      <label
        htmlFor="location"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Ship to
      </label>
      <select
        id="location"
        name="location"
        className=" block rounded-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={(e) => {
          selectedRegion.id.value = e.currentTarget.value;
          location.reload();
        }}
        value={selectedRegion.id.value}
      >
        {countries?.map((country) => (
          <option value={country.region_id}>{country.name}</option>
        ))}
      </select>
    </div>
  );
};

export default ShipmentRegions;
