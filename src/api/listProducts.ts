import Medusa from "@medusajs/medusa-js";

export const listProducts = async () => {
  const medusa = new Medusa({
    baseUrl: "https://store.curiosta.com/",
    maxRetries: 3,
  });
  return medusa.products.list();
};
