import medusa from "@api/medusa";
export type Item = {
  cartId: string;
  line_id: string;
  quantity: number;
};

export const updateLineItem = async ({ cartId, line_id, quantity }: Item) => {
  return medusa.carts.lineItems.update(cartId, line_id, {
    quantity,
  });
};
