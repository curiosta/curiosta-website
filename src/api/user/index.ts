import medusa from "@api/medusa";
import type { Customer, StorePostCustomersCustomerReq, StorePostCustomersReq } from "@medusajs/medusa";
import { signal } from "@preact/signals";

class User {
  state = signal<"authenticated" | "loading" | "unauthenticated">("loading");
  customer = signal<Omit<Customer, 'password_hash'> | null>(null);

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
  async updateUser(payload: StorePostCustomersCustomerReq) {
    const response = await medusa.customers.update(payload)
    this.customer.value = response.customer
  }
}

const user = new User();

export default user;
