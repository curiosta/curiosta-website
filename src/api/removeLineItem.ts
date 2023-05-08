import Medusa from "@medusajs/medusa-js";

export type Item = {
  cardId: string;
  line_id: string;
};

export const removeLineItem = async ({ cardId, line_id }: Item) => {
  const medusa = new Medusa({
    baseUrl: import.meta.env.PUBLIC_BASE_URL,
    maxRetries: 3,
  });
  return medusa.carts.lineItems.delete(cardId, line_id);
};
