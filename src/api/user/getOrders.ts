import medusa from "@api/medusa";

export const getOrders = async (id: string) => {
  return medusa.orders.retrieve(id);
};
