import medusa from "@api/medusa";

export const listProducts = async () => {
  return medusa.products.list();
};
