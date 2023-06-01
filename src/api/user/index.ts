import getCart from "@api/cart/getCart";
import medusa from "@api/medusa";
import type { Customer, StorePostCustomersCustomerReq } from "@medusajs/medusa";
import { signal } from "@preact/signals";
import { cart } from "@store/cartStore";

class User {
  state = signal<"authenticated" | "loading" | "unauthenticated">("loading");
  customer = signal<Omit<Customer, "password_hash"> | null>(null);

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
      if (this.customer.value.metadata?.cartId) {
        const res = await getCart(
          this.customer.value.metadata?.cartId as string
        );
        cart.value = res.cart;
      }
    } catch (response: any) {
      const errorJson = response.toJSON?.();
      // user is unauthenticated
      if (errorJson.status === 401) {
        this.state.value = "unauthenticated";
      }
    }
  }
  async updateUser(payload: StorePostCustomersCustomerReq) {
    const response = await medusa.customers.update(payload);
    this.customer.value = response.customer;
  }
  async resetCartId() {
    const response = await medusa.carts.create();
    await medusa.customers.update({ metadata: { cartId: response.cart.id } });
    cart.value = response.cart;
    return response.cart;
  }
}

const user = new User();

export default user;
