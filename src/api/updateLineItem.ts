import Medusa from "@medusajs/medusa-js";

export type Item = {
  cardId: string;
  line_id: string;
  quantity: number;
};

export const updateLineItem = async ({ cardId, line_id, quantity }: Item) => {
  const medusa = new Medusa({
    baseUrl: import.meta.env.PUBLIC_BASE_URL,
    maxRetries: 3,
  });
  return medusa.carts.lineItems.update(cardId, line_id, {
    quantity,
  });
};
