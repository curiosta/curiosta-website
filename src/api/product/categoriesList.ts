import medusa from "@api/medusa";

export const categoriesList = async () => {
  return medusa.productCategories.list({
    expand: "products",
    include_descendants_tree: true,
  });
};
