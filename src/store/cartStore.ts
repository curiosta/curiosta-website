import { Signal, signal } from "@preact/signals";

export type CartItem = {
  id: string;
  name: string;
  imageSrc: string;
  quantity: number;
  variant: {
    id: Signal<string | undefined>;
    title: Signal<string | undefined>;
    inventoryQty: Signal<number | undefined>;
    price: Signal<number | undefined>;
  };
};

export type CartItemDisplayInfo = Pick<
  CartItem,
  "id" | "name" | "imageSrc" | "variant"
>;

let localData = [];
if (typeof window !== "undefined") {
  localData = JSON.parse(localStorage.getItem("cartItem")!);
}

export const cartItems = signal<CartItem[]>(localData ?? []);

export function addItemToCart({
  id,
  name,
  imageSrc,
  variant,
}: CartItemDisplayInfo) {
  const cartItemsValue = cartItems.value;

  if (!cartItemsValue) return;

  const existingCartItem = cartItemsValue.find(
    (item) => item.id === id && String(item.variant.id) === variant.id.value
  );

  if (existingCartItem) {
    existingCartItem.quantity += 1;
  } else {
    cartItemsValue.push({ id, name, imageSrc, variant, quantity: 1 });
  }
}

export function increaseCartItem(
  id: string,
  variantId: Signal<string | undefined>
) {
  const cartItemsValue = cartItems.value;

  const index = cartItemsValue.findIndex(
    (item) => item.id === id && item.variant.id === variantId
  );

  if (index !== -1) {
    const updateCartItems = [...cartItemsValue];
    updateCartItems[index] = {
      ...updateCartItems[index],
      quantity: updateCartItems[index].quantity + 1,
    };
    return (cartItems.value = updateCartItems);
  }
}

export function decreaseCartItem(
  id: string,
  variantId: Signal<string | undefined>
) {
  const cartItemsValue = cartItems.value;
  const index = cartItemsValue.findIndex(
    (item) => item.id === id && item.variant.id === variantId
  );

  if (index !== -1) {
    const updateCartItems = [...cartItemsValue];
    updateCartItems[index] = {
      ...updateCartItems[index],
      quantity: updateCartItems[index].quantity - 1,
    };
    return (cartItems.value = updateCartItems);
  }
}

export function removeCartItem(
  id: string,
  variantId: Signal<string | undefined>
) {
  const updateCart = cartItems.value.filter(
    (item) => item.id !== id || item.variant.id !== variantId
  );
  return (cartItems.value = updateCart);
}
