import medusa from "@api/medusa";

export type Item = {
  cardId: string;
  line_id: string;
};

export const removeLineItem = async ({ cardId, line_id }: Item) => {
  return medusa.carts.lineItems.delete(cardId, line_id);
};
