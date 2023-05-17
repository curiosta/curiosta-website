import medusa from "@api/medusa";

export const listProducts = async (limit?: number) => {
  return medusa.products.list({ limit });
};
