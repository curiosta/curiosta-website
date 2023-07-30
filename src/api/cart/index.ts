import medusa from "@api/medusa";
import user from "@api/user";
import useLocalStorage from "@hooks/useLocalStorage";
import type {
  StoreCompleteCartRes,
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

type TLoadableOptionsList = {
  cart:
    | "get"
    | "create"
    | "update"
    | "reset"
    | "complete"
    | {
        line_items: "get" | "add" | "remove" | "update" | { quantity: "" };
        shipping: "all" | "set";
      };
};

type TLoadableOptions = FlattenOptionsList<TLoadableOptionsList>;

class CartStore {
  // actual cart data
  store = signal<TCart | null>(null);
  // order data
  orderStore = signal<StoreCompleteCartRes | null>(null);

  loading = signal<TLoadableOptions | undefined>(undefined);

  // shipping methods related states
  shipping = {
    options: signal<PricedShippingOption[] | undefined>(undefined),
    selectedOption: signal<string | undefined>(undefined),
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
    this.loading.value = "cart:get";
    let cartId: string | undefined;
    const { get } = useLocalStorage();
    const localStorageCartId = get("cartId") || undefined;

    if (user.state.value === "authenticated") {
      // if user is authenticated, get cart id from server
      cartId = user.customer.value?.metadata?.cart_id || undefined;
    } else if (user.state.value === "unauthenticated") {
      // if user is unauthenticated, set cart id from local storage
      cartId = localStorageCartId;
    }

    if (!cartId && user.state.value !== "loading") {
      this.loading.value = undefined;
      return await this.resetCartId();
    }

    if (cartId) {
      const cart = await this.getCart(cartId);

      this.store.value = cart;

      if (localStorageCartId && user.state.value === "authenticated") {
        this.mergeCartItems(localStorageCartId);
      }
    }
    this.loading.value = undefined;
  }

  // cart

  private async getCart(id: string) {
    this.loading.value = "cart:get";
    const result = await medusa.carts.retrieve(id);
    this.loading.value = undefined;
    return result.cart;
  }

  async createCart(payload?: TCartCreatePayload) {
    this.loading.value = "cart:create";
    const result = await medusa.carts.create(payload);
    this.store.value = result.cart;
    if (user.state.value === "authenticated") {
      await user.updateUser({ metadata: { cart_id: result.cart.id } });
    } else if (user.state.value === "unauthenticated") {
      const { set } = useLocalStorage();
      set("cartId", result.cart.id);
    }
    await this.listShippingMethods();
    this.loading.value = undefined;
  }
  async updateCart(payload: TCartUpdatePayload) {
    if (!this.store.value)
      throw new Error(
        "Cart was not initialize before using cart.updateCart function."
      );
    this.loading.value = "cart:update";

    const updateResult = await medusa.carts.update(
      this.store.value.id,
      payload
    );
    this.store.value = updateResult.cart;

    this.loading.value = undefined;
  }

  async resetCartId() {
    this.loading.value = "cart:reset";
    const response = await medusa.carts.create();
    if (user.state.value === "authenticated") {
      await user.updateUser({ metadata: { cart_id: response.cart.id } });
    } else if (user.state.value === "unauthenticated") {
      const { set } = useLocalStorage();
      set("cartId", response.cart.id);
    }
    this.store.value = response.cart;
    this.loading.value = undefined;
    return response.cart;
  }

  async mergeCartItems(fromCartId: string) {
    const fromCart = await this.getCart(fromCartId);
    fromCart.items.map(
      (item) => item.variant_id && this.addItem(item.variant_id, item.quantity)
    );
    const { remove } = useLocalStorage();
    remove("cartId");
  }

  // line items

  async addItem(id: string, quantity = 1) {
    if (!this.store.value)
      throw new Error(
        "Cart was not initialize before using cart.addItem function."
      );
    this.loading.value = "cart:line_items:add";
    const response = await medusa.carts.lineItems.create(this.store.value.id, {
      quantity,
      variant_id: id,
    });
    this.loading.value = undefined;
    this.store.value = response.cart;
  }

  async removeItem(id: string) {
    if (!this.store.value)
      throw new Error(
        "Cart was not initialize before using cart.removeItem function."
      );
    this.loading.value = "cart:line_items:remove";
    const response = await medusa.carts.lineItems.delete(
      this.store.value.id,
      id
    );
    this.store.value = response.cart;
    this.loading.value = undefined;
  }

  async setItemQuantity(id: string, quantity: number) {
    if (!this.store.value)
      throw new Error(
        "Cart was not initialize before using cart.setItemQuantity function."
      );
    this.loading.value = "cart:line_items:update";
    const item = this.store.value.items.find((item) => item.id === id);
    if (quantity < 1) {
      this.loading.value = undefined;
      throw new Error("Cannot set quantity less than 1.");
    }
    if (!item) {
      this.loading.value = undefined;
      throw new Error("Cannot find item with this id!");
    }
    if (quantity > item.variant.inventory_quantity) {
      this.loading.value = undefined;
      throw new Error(
        `Cannot set quantity exceeding ${item.variant.inventory_quantity} !.`
      );
    }
    const response = await medusa.carts.lineItems.update(
      this.store.value.id,
      id,
      { quantity }
    );
    this.store.value = response.cart;
    this.loading.value = undefined;
    await this.listShippingMethods();
  }

  // shipping methods

  async listShippingMethods() {
    if (!this.store.value?.id) return null;
    this.loading.value = "cart:shipping:all";

    const response = await medusa.shippingOptions.listCartOptions(
      this.store.value.id
    );
    this.shipping.options.value = response.shipping_options;
    this.loading.value = undefined;
    return response.shipping_options;
  }

  async updateShippingMethod(id: string) {
    if (!this.store.value?.id) return null;
    this.loading.value = "cart:shipping:set";
    const result = await medusa.carts.addShippingMethod(this.store.value.id, {
      option_id: id,
    });
    this.shipping.selectedOption.value = id;
    this.loading.value = undefined;
    this.store.value = result.cart;
  }

  // complete cart
  async completeCart(id: string) {
    if (!this.store.value?.id) return null;
    this.loading.value = "cart:complete";
    const result = await medusa.carts.complete(id);
    this.orderStore.value = result;
    this.loading.value = undefined;
  }
}

const cart = new CartStore();

export default cart;
