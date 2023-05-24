import type { ProductCategory } from "@medusajs/medusa";

function removeSelectedChildrenCategories(
  selectedCategoryIds: string[],
  categoryId: string,
  categories: ProductCategory | ProductCategory[]
): string[] {
  const categoryArray = Array.isArray(categories) ? categories : [categories];
  const category = categoryArray.find((cat) => cat.id === categoryId);

  if (!category) {
    return selectedCategoryIds;
  }

  // Check if any child category ID is already selected
  const isChildSelected = category.category_children.some((child) =>
    selectedCategoryIds.includes(child.id)
  );

  // Remove the category ID if any child is selected
  if (isChildSelected) {
    selectedCategoryIds = selectedCategoryIds.filter((id) => id !== categoryId);
  }

  // Recursively remove selected children categories
  category.category_children.forEach((child) => {
    selectedCategoryIds = removeSelectedChildrenCategories(
      selectedCategoryIds,
      child.id,
      categories
    );
  });

  return selectedCategoryIds;
}

export default removeSelectedChildrenCategories;
