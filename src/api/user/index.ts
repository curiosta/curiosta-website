import medusa from "@api/medusa";
import type {
  Customer,
  StorePostCustomersCustomerReq,
} from "@medusajs/medusa";
import { signal } from "@preact/signals";

type TCustomerMetadata = {
  cart_id?: string | null;
  stripe_id?: string;
  country_id?: number;
}

export type TCustomer = Omit<Customer, "password_hash" | 'metadata'> & {
  metadata?: TCustomerMetadata
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
}

const user = new User();

export default user;
