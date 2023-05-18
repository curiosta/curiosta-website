import medusa from "@api/medusa";

export type Item = {
  cartId: string;
  line_id: string;
};

export const removeLineItem = async ({ cartId: cardId, line_id }: Item) => {
  return medusa.carts.lineItems.delete(cardId, line_id);
};
