import medusa from "@api/medusa";
export type Item = {
  cardId: string;
  line_id: string;
  quantity: number;
};

export const updateLineItem = async ({ cardId, line_id, quantity }: Item) => {
  return medusa.carts.lineItems.update(cardId, line_id, {
    quantity,
  });
};
