import medusa from "@api/medusa";
import type { Address, AddressPayload } from "@medusajs/medusa";

interface UpdateCart {
  cartId: string;
  shipping_address?: AddressPayload | string;
  billing_address?: AddressPayload | string;
}

export const updateCart = ({
  cartId,
  shipping_address,
  billing_address,
}: UpdateCart) => {
  return medusa.carts.update(cartId, {
    shipping_address,
    billing_address,
  });
};
