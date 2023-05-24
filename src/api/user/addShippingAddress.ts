import medusa from "@api/medusa";
import type { AddressCreatePayload } from "@medusajs/medusa";

export const addShippingAddress = ({
  first_name,
  last_name,
  phone,
  metadata,
  company,
  address_1,
  address_2,
  city,
  country_code,
  province,
  postal_code,
}: AddressCreatePayload) => {
  return medusa.customers.addresses.addAddress({
    address: {
      first_name,
      last_name,
      phone,
      metadata,
      company,
      address_1,
      address_2,
      city,
      country_code,
      province,
      postal_code,
    },
  });
};
