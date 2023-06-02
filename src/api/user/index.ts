import getCart from "@api/cart/getCart";
import medusa from "@api/medusa";
import useLocalStorage from "@hooks/useLocalStorage";
import type {
  Customer,
  StorePostCustomersCustomerReq,
} from "@medusajs/medusa";
import { signal } from "@preact/signals";
import { cart } from "@store/cartStore";

type TCustomerMetadata = {
  cart_id?: string | null;
  stripe_id?: string;
  country_id?: number;
}

export type TCustomer = Omit<Customer, "password_hash" | 'metadata'> & {
  metadata: TCustomerMetadata
}

export type TCustomerUpdatePayload = Omit<StorePostCustomersCustomerReq, 'metadata'> & {
  metadata?: TCustomerMetadata
}

class User {
  state = signal<"authenticated" | "loading" | "unauthenticated">("loading");
  customer = signal<TCustomer | null>(null);

  constructor() {
    // initially call user
    this.refetch();
  }

  async refetch() {
    try {
      // user is logged in
      const result = await medusa.auth.getSession();
      this.customer.value = result.customer;
      this.state.value = "authenticated";
    } catch (response: any) {
      const errorJson = response.toJSON?.();
      // user is unauthenticated
      if (errorJson.status === 401) {
        this.state.value = "unauthenticated";
      }
    }
  }
  async updateUser(payload: TCustomerUpdatePayload) {
    const response = await medusa.customers.update(payload);
    this.customer.value = response.customer;
  }
  async resetCartId() {
    const response = await medusa.carts.create();

    if (this.state.value === 'authenticated') {
      await medusa.customers.update({ metadata: { cart_id: response.cart.id } });
    } else if (this.state.value === 'unauthenticated') {
      const { set } = useLocalStorage();
      set('cartId', response.cart.id);
    }
    cart.value = response.cart;
    return response.cart;
  }

  async setCart() {
    const userState = this.state.value;
    if (userState === "authenticated") {
      const userCartId = this.customer.value?.metadata.cart_id as string;
      if (userCartId) {
        const res = await medusa.carts.retrieve(userCartId);
        cart.value = res.cart;
        return res.cart;
      } else {
        await user.resetCartId();
      }
    } else if (userState === "unauthenticated") {
      const { get } = useLocalStorage();
      const localData = get("cart");
      return (cart.value = localData);
    }
  }
}

const user = new User();

export default user;
