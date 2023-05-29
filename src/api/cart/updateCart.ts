import medusa from "@api/medusa";
import type { StorePostCartsCartReq } from "@medusajs/medusa";
import { cart } from "@store/cartStore";

export const updateCart = async (payload: StorePostCartsCartReq & { cartId: string }) => {
  const updatePayload = { ...payload, cartId: undefined };
  const res = await medusa.carts.update(payload.cartId, updatePayload);
  cart.value = res.cart
};
