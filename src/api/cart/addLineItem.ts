import medusa from "@api/medusa";
export type Item = {
  cardId: string;
  variant_id: string;
  quantity: number;
};

export const addLineItem = async ({ cardId, variant_id, quantity }: Item) => {
  return medusa.carts.lineItems.create(cardId, {
    variant_id,
    quantity,
  });
};
