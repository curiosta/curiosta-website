import medusa from "@api/medusa";

export interface ShippingAddress {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  country_code: string;
  postal_code: string;
  phone: string;
}

export const addShippingAddress = ({
  first_name,
  last_name,
  address_1,
  city,
  country_code,
  postal_code,
  phone,
}: ShippingAddress) => {
  return medusa.customers.addresses.addAddress({
    address: {
      first_name,
      last_name,
      address_1,
      city,
      country_code,
      postal_code,
      phone,
    },
  });
};
