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
  // checking if product already exists in cart or not
  const existingCartItem = cartItems.value?.find(
    (item) => item.id === id && String(item.variant.id) === variant.id.value
  );

  if (existingCartItem) {
    // product already exists in cart. Updating it's quantity by 1
    cartItems.value = cartItems.value.map((item) => item.id === id ? ({ ...item, quantity: item.quantity + 1 }) : item)

  } else {

    // adding new product to cart
    cartItems.value = [...cartItems.value, { id, name, imageSrc, variant, quantity: 1 }];
  }
}

export function increaseCartItem(
  id: string,
  variantId: Signal<string | undefined>
) {
  const CartProductIndex = cartItems.value.findIndex(
    (item) => item.id === id && item.variant.id === variantId
  );

  if (CartProductIndex === -1) return;

  const updateCartItems = [...cartItems.value];

  updateCartItems[CartProductIndex] = {
    ...updateCartItems[CartProductIndex],
    quantity: updateCartItems[CartProductIndex].quantity + 1,
  };
  return (cartItems.value = updateCartItems);
}

export function decreaseCartItem(
  id: string,
  variantId: Signal<string | undefined>
) {
  cartItems.value = cartItems.value.map((value) => value.id === id && value.variant.id === variantId ? ({ ...value, quantity: value.quantity - 1 }) : value)
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
