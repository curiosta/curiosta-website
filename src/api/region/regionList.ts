import medusa from "@api/medusa";
import useLocalStorage from "@hooks/useLocalStorage";
import type { Country, Region } from "@medusajs/medusa";
import { signal } from "@preact/signals";
import cart from "@api/cart";

// set default region
const { get, set } = useLocalStorage();

const region = get('region');
const countryId = get('countryId');

export const regions = signal<Region[] | undefined>(undefined);
export const activeRegion = signal<Region | undefined>(undefined)
export const activeCountry = signal<Country | undefined>(undefined);

// queries
export const regionList = async () => {
  try {
    const regionsResponse = await medusa.regions.list();
    regions.value = regionsResponse.regions
  } catch (error) {
    console.error(error);
  }
};

export const getCartRegion = (cartRegionId: string) => {
  return medusa.regions.retrieve(cartRegionId)
}

// mutations
export const updateRegion = async (regionId: string) => {
  try {
    cart.updateCart({ region_id: regionId })
    if (regions.value?.length) {
      const currentRegion = regions.value.filter((region) => region.id === regionId)[0];
      currentRegion && (activeRegion.value = currentRegion)
      set('region', currentRegion)
    }
  } catch (error) {
    console.error(error)
  }
}

export const updateRegionByCountryId = (id: number) => {
  const activeCountry = regions.value?.map(r => r.countries).flat(1).filter(country => country.id === id)[0]
  activeCountry?.region_id && updateRegion(activeCountry.region_id);
  setActiveCountry(id);
}

export const getRegion = (id: string) => {
  return medusa.regions.retrieve(id)
}

export const setActiveCountry = (id: number) => {
  const country = regions.value?.map((r) => r.countries).flat(1).filter(country => country.id === id)[0];
  country?.id && set('countryId', country.id);
  activeCountry.value = country
}

// initial setup
(async () => {
  await regionList();
  countryId && await setActiveCountry(countryId);

  // select india region if no region exist in user's browser | remove before implement global regions
  const indiaRegion = regions.value?.filter((r) => r.countries.map((c) => c.iso_2).includes('in'))[0];

  !region && indiaRegion && set('region', indiaRegion)
})();