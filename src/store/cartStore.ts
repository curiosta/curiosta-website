import { removeLineItem } from "@api/cart/removeLineItem";
import { updateLineItem } from "@api/cart/updateLineItem";
import { signal } from "@preact/signals";

export type CartItem = {
  id: string;
  description: string;
  quantity: number;
  thumbnail: string;
  unit_price: number;
  title: string;
  variant: {
    product_id: string;
  };
}

export type Cart = {
  id: string;
  items?: CartItem[];
  region?: {
    currency_code: string;
  };
  shipping_address: string[];
  shipping_address_id: string | null;
  subtotal?: number;
  shipping_total?: number;
  tax_total?: number;
  total?: number;
};

let localData = [];
if (typeof window !== "undefined") {
  localData = JSON.parse(localStorage.getItem("cart")!);
}

export const cart = signal<Cart>(localData ?? []);
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
