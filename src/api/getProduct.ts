import Medusa from "@medusajs/medusa-js";

export const getProduct = async (productId: string) => {
  const medusa = new Medusa({
    baseUrl: "https://store.curiosta.com/",
    maxRetries: 3,
  });
  return medusa.products.retrieve(productId);
};
