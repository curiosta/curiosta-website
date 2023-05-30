import medusa from "@api/medusa";
import user from ".";

export const removeShippingAddress = async (id: string) => {
  try {
    const res = await medusa.customers.addresses.deleteAddress(id);
    user.customer.value = res.customer
  } catch (error) {

  }
};
