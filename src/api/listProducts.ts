import Medusa from "@medusajs/medusa-js";

export const listProducts = async () => {
  const medusa = new Medusa({
    baseUrl: import.meta.env.PUBLIC_BASE_URL,
    maxRetries: 3,
  });
  return medusa.products.list();
};
