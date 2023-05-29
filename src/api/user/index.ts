import medusa from "@api/medusa";
import type { Customer } from "@medusajs/medusa";
import { signal } from "@preact/signals";

class User {
  state = signal<"authenticated" | "loading" | "unauthenticated">("loading");
  customer = signal<Customer | null>(null);

  constructor() {
    // intially call user
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
}

const user = new User();

export default user;
