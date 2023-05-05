import Medusa from "@medusajs/medusa-js";

export type Item = {
  cardId: string;
  variant_id: string;
  quantity: number;
};

export const addLineItem = async ({ cardId, variant_id, quantity }: Item) => {
  const medusa = new Medusa({
    baseUrl: import.meta.env.PUBLIC_BASE_URL,
    maxRetries: 3,
  });
  return medusa.carts.lineItems.create(cardId, {
    variant_id,
    quantity,
  });
};
