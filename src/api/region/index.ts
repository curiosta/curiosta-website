import cart from "@api/cart";
import medusa from "@api/medusa";
import user from "@api/user";
import useLocalStorage from "@hooks/useLocalStorage";
import type { Country } from "@medusajs/medusa";
import { effect, signal } from "@preact/signals"


class Region {
  countries = signal<Country[]>([]);

  selectedCountry = signal<Country | undefined>(undefined);

  constructor() {
    // run initialize when user.state.value changes from loading to authenticated/unauthenticated
    effect(() => {
      this.initialize();
    })
  }

  async initialize() {
    if (!cart.store.value) return;
    const userCountryId = user.customer.value?.metadata?.country_id
    const result = await medusa.regions.list();
    const { regions } = result;

    const countries = regions.map((region) => region.countries).flat(1).sort((a, z) => a.display_name > z.display_name ? 1 : -1).map((country) => {
      const countryRegion = regions.find((r) => r.id == country.region_id);
      if (countryRegion) {
        country.region = countryRegion
      }
      return country
    })

    this.countries.value = countries;


    let countryId: number | undefined = userCountryId;

    if (user.state.value === 'unauthenticated') {
      const { get } = useLocalStorage()
      countryId = get('countryId') || undefined;
    }

    if (!countryId && cart.store.value) {
      this.setCountry(this.countries.value?.[0].id)
    }

    if (countryId) {
      const country = this.countries.value.find((country) => country.id === countryId);
      this.selectedCountry.value = country
      return;
    }

  }

  async setCountry(id: number) {
    const country = this.countries.value.find((country) => country.id === id);
    if (!country || user.state.value === 'loading') return;

    if (user.state.value === 'authenticated') {
      await user.updateUser({ metadata: { country_id: id } });
    } else {
      const { set } = useLocalStorage();
      set('countryId', id)
    }
    await cart.updateCart({ region_id: country.region_id || undefined });
    await cart.listShippingMethods()
    this.selectedCountry.value = country
  }

}


const region = new Region();


export default region;