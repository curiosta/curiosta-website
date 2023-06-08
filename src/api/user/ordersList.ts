import medusa from "@api/medusa";
import type { StoreGetCustomersCustomerOrdersParams } from "@medusajs/medusa";

export const ordersList = async ({
  limit,
  offset,
}: StoreGetCustomersCustomerOrdersParams) => {
  return medusa.customers.listOrders({ limit, offset, expand: "items" });
};
