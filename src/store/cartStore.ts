import { signal } from "@preact/signals";

export type CartItem = {
  id: string;
  name: string;
  imageSrc: string;
  quantity: number;
  price: number;
  variant: string;
};

export type CartItemDisplayInfo = Pick<
  CartItem,
  "id" | "name" | "imageSrc" | "price" | "variant"
>;

const localData = JSON.parse(localStorage.getItem("cartItem")!);

export const cartItems = signal<CartItem[]>(localData || []);

export function addCartItem({
  id,
  name,
  imageSrc,
  price,
  variant,
}: CartItemDisplayInfo) {
  const existingProductId = cartItems.value?.some((item) => item.id === id);
  const existingProductVariant = cartItems.value?.some(
    (item) => item.variant === variant
  );
  if (existingProductId && existingProductVariant) {
    cartItems.value = cartItems.value.map((item) => {
      if (item.variant === variant) {
        return { ...item, quantity: item.quantity + 1 };
      } else {
        return item;
      }
    });
    return;
  } else {
    cartItems.value = [
      ...cartItems.value,
      { id, name, imageSrc, price, variant, quantity: 1 },
    ];
  }
}

export function increaseCartItem(id: string, variant: string) {
  const existingProductId = cartItems.value?.some((item) => item.id === id);
  const existingProductVariant = cartItems.value?.some(
    (item) => item.variant === variant
  );
  if (existingProductId && existingProductVariant) {
    cartItems.value = cartItems.value.map((item) => {
      if (item.variant === variant) {
        return { ...item, quantity: item.quantity + 1 };
      } else {
        return item;
      }
    });
    return;
  }
}
export function decreaseCartItem(id: string, variant: string) {
  const existingProductId = cartItems.value?.some((item) => item.id === id);
  const existingProductVariant = cartItems.value?.some(
    (item) => item.variant === variant
  );
  if (existingProductId && existingProductVariant) {
    cartItems.value = cartItems.value.map((item) => {
      if (item.variant === variant) {
        return { ...item, quantity: item.quantity - 1 };
      } else {
        return item;
      }
    });
    return;
  }
}

export function removeCartItem(id: string, variant: string) {
  const updateCart = cartItems.value.filter(
    (item) => item.id !== id || item.variant !== variant
  );
  return (cartItems.value = updateCart);
}
