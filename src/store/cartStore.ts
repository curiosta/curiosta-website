import { removeLineItem } from "@api/cart/removeLineItem";
import { updateLineItem } from "@api/cart/updateLineItem";
import type { StoreCartsRes } from "@medusajs/medusa";
import { signal } from "@preact/signals";

let localData = [];
if (typeof window !== "undefined") {
  localData = JSON.parse(localStorage.getItem("cart")!);
}

export const cart = signal<StoreCartsRes['cart']>(localData ?? []);
export const cartOpen = signal<boolean>(false);

export async function increaseCartItem(
  cartId: string,
  line_id: string,
  quantity: number
) {
  const updateCart = await updateLineItem({
    cartId,
    line_id,
    quantity: quantity + 1 >= 10 ? 10 : quantity + 1,
  });
  cart.value = updateCart.cart;
}

export async function decreaseCartItem(
  cartId: string,
  line_id: string,
  quantity: number
) {
  const updateCart = await updateLineItem({
    cartId,
    line_id,
    quantity: quantity - 1 <= 1 ? 1 : quantity - 1,
  });
  cart.value = updateCart.cart;
}

export async function removeCartItem(cartId: string, line_id: string) {
  const updateCart = await removeLineItem({ cartId: cartId, line_id });
  cart.value = updateCart.cart;
}
