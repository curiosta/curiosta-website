import { removeLineItem } from "@api/removeLineItem";
import { updateLineItem } from "@api/updateLineItem";
import { signal } from "@preact/signals";

export type Cart = {
  id: string;
  items: {
    id: string;
    description: string;
    quantity: number;
    thumbnail: string;
    unit_price: number;
    title: string;
    variant: {
      product_id: string;
    };
  }[];
  subtotal: number;
  shipping_total: number;
  tax_total: number;
  total: number;
};

let localData = [];
if (typeof window !== "undefined") {
  localData = JSON.parse(localStorage.getItem("cart")!);
}

export const cart = signal<Cart>(localData ?? []);

export async function increaseCartItem(
  cardId: string,
  line_id: string,
  quantity: number
) {
  const updateCart = await updateLineItem({
    cardId,
    line_id,
    quantity: quantity + 1,
  });
  cart.value = updateCart.cart;
}

export async function decreaseCartItem(
  cardId: string,
  line_id: string,
  quantity: number
) {
  const updateCart = await updateLineItem({
    cardId,
    line_id,
    quantity: quantity - 1,
  });
  cart.value = updateCart.cart;
}

export async function removeCartItem(cardId: string, line_id: string) {
  const updateCart = await removeLineItem({ cardId, line_id });
  cart.value = updateCart.cart;
  console.log(updateCart);
}
