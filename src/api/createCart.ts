import Medusa from "@medusajs/medusa-js";
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
  const medusa = new Medusa({
    baseUrl: import.meta.env.PUBLIC_BASE_URL,
    maxRetries: 3,
  });
  return medusa.carts.create({
    items: [{ variant_id, quantity }],
  });
};
