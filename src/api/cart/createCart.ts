import medusa from "@api/medusa";
export type CreateCart = {
  country_code?: string;
  variant_id: string;
  quantity: number;
};
export const createCart = async ({
  country_code,
  variant_id,
  quantity,
}: CreateCart) => {
  return medusa.carts.create({
    items: [{ variant_id, quantity }],
  });
};
