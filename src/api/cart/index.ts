import medusa from "@api/medusa";
import user from "@api/user";
import useLocalStorage from "@hooks/useLocalStorage";
import type { Cart } from "@medusajs/medusa"
import { effect, signal } from "@preact/signals"
import queryWrapper from "@utils/queryWrapper";

type TCart = Omit<Cart, "refundable_amount" | "refunded_total">

class CartStore {
  store = signal<TCart | null>(null);

  constructor() {
    effect(() => {
      this.initialize();
    })
  }

  async initialize() {
    if (this.store.value) return;

    let cartId: string | undefined;

    if (user.state.value === 'authenticated') {
      // if user is authenticated, get cart id from server
      cartId = user.customer.value?.metadata.cart_id || undefined;

    } else if (user.state.value === 'unauthenticated') {
      // if user is unauthenticated, get cart id from local storage

      const { get } = useLocalStorage();
      cartId = get('cartId') || undefined;
    }

    if (!cartId) {
      return await this.resetCartId()
    }

    const { data } = await this.getCart(cartId);
    if (data) {
      this.store.value = data;
    }
  }

  async getCart(id: string) {
    return queryWrapper(async () => {
      const result = await medusa.carts.retrieve(id);
      return result.cart;
    })
  }

  async resetCartId() {
    return queryWrapper(async () => {
      const response = await medusa.carts.create();
      if (user.state.value === 'authenticated') {
        await user.updateUser({ metadata: { cart_id: response.cart.id } })
      } else if (user.state.value === 'unauthenticated') {
        const { set } = useLocalStorage();
        set('cartId', response.cart.id);
      }
      this.store.value = response.cart;
      return response.cart;
    })
  }

  async addItem(id: string, quantity = 1) {
    return queryWrapper(async () => {
      if (!this.store.value) return;
      const response = await medusa.carts.lineItems.create(this.store.value.id, { quantity, variant_id: id });
      this.store.value = response.cart;
    })
  }

  async removeItem(id: string) {
    return queryWrapper(async () => {
      if (!this.store.value) return;
      const response = await medusa.carts.lineItems.delete(this.store.value.id, id);
      if (response.cart.items.length) {
        this.store.value = response.cart
      } else {
        this.resetCartId()
      }
    })
  }
  async setItemQuantity(id: string, quantity: number) {
    return queryWrapper(async () => {
      if (!this.store.value) return;
      const item = this.store.value.items.find(item => item.id === id);
      if (quantity < 1) {
        throw new Error('Cannot set quantity less than 1.');
      }
      if (!item) {
        throw new Error('Cannot find item with this id!');
      }
      if (quantity > item.quantity) {
        throw new Error(`Cannot set quantity exceeding ${item.quantity}!.`);
      }
      const response = await medusa.carts.lineItems.update(this.store.value.id, id, { quantity });
      this.store.value = response.cart
    })
  }
}


const cart = new CartStore();

export default cart;

