import medusa from "@api/medusa";
export const getProduct = async (productId: string) => {
  return medusa.products.retrieve(productId);
};
