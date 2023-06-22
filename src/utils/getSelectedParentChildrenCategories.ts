import type { ProductCategory } from "@medusajs/medusa";

/**
 * 
 * @param selectedIDs 
 * @param category 
 * @returns {string[]} All children IDs which are inside selectedCategoryIds.
 */
const getCategorySelectedChildIDs = (selectedIDs: string[], category: ProductCategory) => {
  const childIds: string[] = []
  const getAllChildIDs = (categories: ProductCategory[]) => {
    categories.forEach((c) => {
      childIds.push(c.id)
      if (c.category_children.length) {
        getAllChildIDs(c.category_children);
      }
    })
  }

  childIds.push(category.id)
  getAllChildIDs(category.category_children)

  const selectedChildIds: string[] = [];

  selectedIDs.forEach((id) => childIds.includes(id) && selectedChildIds.push(id));

  return selectedChildIds;
}

export default getCategorySelectedChildIDs