import medusa from "@api/medusa";
import { regions } from "@api/region/regionList";
import type { Country } from "@medusajs/medusa";
import { signal } from "@preact/signals";

const activeCountry = signal<Country | undefined>(undefined);

const setCountry = async (countryId: number) => {
  await medusa.customers.update({
    metadata: {
      activeCountry: countryId
    }
  });
  const countryRegion = regions.value?.map(r => r.countries).flat(1)[0]?.region;
}

const initialize = async () => {
}