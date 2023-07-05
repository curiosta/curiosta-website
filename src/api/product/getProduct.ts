import medusa from "@api/medusa";
export const getProduct = async (handle: string) => {
  const arrayOfProduct = await medusa.products.list({ handle });
  return arrayOfProduct.products[0]
};
