import medusa from "@api/medusa";
import user from "@api/user";
import useLocalStorage from "@hooks/useLocalStorage";
import type {
  Cart,
  StorePostCartReq,
  StorePostCartsCartReq,
} from "@medusajs/medusa";
import type { PricedShippingOption } from "@medusajs/medusa/dist/types/pricing";
import { effect, signal } from "@preact/signals";

type TCart = Omit<Cart, "refundable_amount" | "refunded_total">;
type TCartMetadata = {};
type TCartUpdatePayload = Omit<StorePostCartsCartReq, "metadata"> & {
  metadata?: TCartMetadata;
};
type TCartCreatePayload = Omit<StorePostCartReq, "metadata"> & {
  metadata?: TCartMetadata;
};

class CartStore {
  // actual cart data
  store = signal<TCart | null>(null);

  // shipping methods related states
  shipping = {
    options: signal<PricedShippingOption[] | undefined>(undefined),
    selectedOption: signal<string | undefined>(undefined),
    isUpdating: signal<boolean>(false),
  };

  // cart drawer state
  open = signal<boolean>(false);

  constructor() {
    // run initialize when user.state.value changes from loading to authenticated/unauthenticated
    effect(() => {
      this.initialize();
    });
  }

  async initialize() {
    // function re runs since we are storing new cart value which makes a render again.
    if (this.store.value) return;
    let cartId: string | undefined;
    if (user.state.value === "authenticated") {
      // if user is authenticated, get cart id from server
      cartId = user.customer.value?.metadata.cart_id || undefined;
    } else if (user.state.value === "unauthenticated") {
      // if user is unauthenticated, get cart id from local storage

      const { get } = useLocalStorage();
      cartId = get("cartId") || undefined;
    }

    if (!cartId && user.state.value !== "loading") {
      return await this.resetCartId();
    }

    if (cartId) {
      const cart = await this.getCart(cartId);
      this.store.value = cart;
    }
  }

  // cart

  private async getCart(id: string) {
    const result = await medusa.carts.retrieve(id);
    return result.cart;
  }

  async createCart(payload?: TCartCreatePayload) {
    const result = await medusa.carts.create(payload);
    this.store.value = result.cart;
    if (user.state.value === "authenticated") {
      await user.updateUser({ metadata: { cart_id: result.cart.id } });
    } else if (user.state.value === "unauthenticated") {
      const { set } = useLocalStorage();
      set("cartId", result.cart.id);
    }
  }
  async updateCart(payload: TCartUpdatePayload) {
    if (!this.store.value) return;
    const updateResult = await medusa.carts.update(
      this.store.value.id,
      payload
    );
    this.store.value = updateResult.cart;
  }

  async resetCartId() {
    const response = await medusa.carts.create();
    if (user.state.value === "authenticated") {
      await user.updateUser({ metadata: { cart_id: response.cart.id } });
    } else if (user.state.value === "unauthenticated") {
      const { set } = useLocalStorage();
      set("cartId", response.cart.id);
    }
    this.store.value = response.cart;
    return response.cart;
  }

  // line items

  async addItem(id: string, quantity = 1) {
    if (!this.store.value) return;
    const response = await medusa.carts.lineItems.create(this.store.value.id, {
      quantity,
      variant_id: id,
    });
    this.store.value = response.cart;
  }

  async removeItem(id: string) {
    if (!this.store.value) return;
    const response = await medusa.carts.lineItems.delete(
      this.store.value.id,
      id
    );
    if (response.cart.items.length) {
      this.store.value = response.cart;
    } else {
      this.resetCartId();
    }
  }

  async setItemQuantity(id: string, quantity: number) {
    if (!this.store.value) return;
    const item = this.store.value.items.find((item) => item.id === id);
    if (quantity < 1) {
      throw new Error("Cannot set quantity less than 1.");
    }
    if (!item) {
      throw new Error("Cannot find item with this id!");
    }
    if (quantity > item.variant.inventory_quantity) {
      throw new Error(
        `Cannot set quantity exceeding ${item.variant.inventory_quantity}!.`
      );
    }
    const response = await medusa.carts.lineItems.update(
      this.store.value.id,
      id,
      { quantity }
    );
    this.store.value = response.cart;
  }

  // shipping methods

  async listShippingMethods() {
    if (!this.store.value?.id) return null;
    const response = await medusa.shippingOptions.listCartOptions(
      this.store.value.id
    );
    this.shipping.options.value = response.shipping_options;
    return response.shipping_options;
  }

  async updateShippingMethod(id: string) {
    if (!this.store.value?.id) return null;
    const result = await medusa.carts.addShippingMethod(this.store.value.id, {
      option_id: id,
    });
    this.store.value = result.cart;
  }
}

const cart = new CartStore();

export default cart;
