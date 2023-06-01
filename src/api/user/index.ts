import getCart from "@api/cart/getCart";
import medusa from "@api/medusa";
import useLocalStorage from "@hooks/useLocalStorage";
import type {
  Customer,
  StoreCartsRes,
  StorePostCustomersCustomerReq,
} from "@medusajs/medusa";
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
      if (this.customer.value.metadata?.cart_id) {
        const res = await getCart(
          this.customer.value.metadata?.cart_id as string
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
    await medusa.customers.update({ metadata: { cart_id: response.cart.id } });
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
      const localData = get<StoreCartsRes["cart"]>("cart");
      return (cart.value = localData);
    }
  }
}

const user = new User();

export default user;
