import { removeLineItem } from "@api/cart/removeLineItem";
import { updateLineItem } from "@api/cart/updateLineItem";
import medusa from "@api/medusa";
import useLocalStorage from "@hooks/useLocalStorage";
import type { StoreCartsRes } from "@medusajs/medusa";
import { signal } from "@preact/signals";
const { get, remove, set } = useLocalStorage();

const localData = get<StoreCartsRes["cart"]>("cart");

export const cart = signal<StoreCartsRes["cart"] | null>(localData || null);
export const cartOpen = signal<boolean>(false);

export const selectedShippingOption = signal<string | undefined>(undefined);
export const isShippingUpdateLoading = signal<boolean>(false);

export const createCart = async () => {
  const res = await medusa.carts.create();
  cart.value = res.cart;
  return res.cart;
};

export const listShippingMethods = async () => {
  if (!cart.value?.id) return;
  const response = await medusa.shippingOptions.listCartOptions(cart.value.id)
  return response.shipping_options
}

export const updateShippingMethod = async (id: string) => {
  if (!cart.value?.id || !id) return;
  selectedShippingOption.value = id;
  isShippingUpdateLoading.value = true;
  try {
    const response = await medusa.carts.addShippingMethod(cart.value.id, { option_id: id })
    cart.value = response.cart
    isShippingUpdateLoading.value = false
    return response.cart;
  } catch (error) {
  } finally {
    isShippingUpdateLoading.value = false
  }
}

export const resetCart = async () => {
  remove("cart");
  remove("cartId");
  const cart = await createCart();
  set("cart", cart);
  set("cartId", cart.id);
};

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

!localData && createCart();
