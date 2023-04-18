import Medusa from "@medusajs/medusa-js";

export const getProduct = async (productId: string) => {
  const medusa = new Medusa({
    baseUrl: import.meta.env.PUBLIC_BASE_URL,
    maxRetries: 3,
  });
  return medusa.products.retrieve(productId);
};
