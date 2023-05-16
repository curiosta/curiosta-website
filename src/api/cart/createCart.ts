import medusa from "@api/medusa";
export type CreateCart = {
  country_code?: string;
  region_id?: string;
  variant_id: string;
  quantity: number;
};
export const createCart = async ({
  country_code,
  region_id,
  variant_id,
  quantity,
}: CreateCart) => {
  return medusa.carts.create({
    region_id,
    items: [{ variant_id, quantity }],
  });
};
