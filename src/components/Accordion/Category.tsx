import Checkbox from "@components/Checkbox";
import Typography from "@components/Typography";
import type { ProductCategory } from "@medusajs/medusa";
import { useSignal } from "@preact/signals";
import { selectedCategoriesIds } from "@store/productStore";
import { cx } from "class-variance-authority";
import type { ChangeEvent } from "preact/compat";
import removeSelectedChildrenCategories from "@utils/mapCategoryListIds";
interface Props {
  category: ProductCategory;
  depth: number;
  categories: ProductCategory[];
}

const Category = ({ category, depth, categories }: Props) => {
  const activeCategory = useSignal<string | null>(null);

  // select categories
  const handleCheck = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.currentTarget;
    if (checked) {
      const result = removeSelectedChildrenCategories(
        selectedCategoriesIds.value,
        value,
        category
      );

      console.log("result", result);
      selectedCategoriesIds.value = [...selectedCategoriesIds.value, value];
    } else {
      selectedCategoriesIds.value = selectedCategoriesIds.value.filter(
        (id) => id !== value
      );
    }
  };

  // select categories
  // const handleCheck = async (e: ChangeEvent<HTMLInputElement>) => {
  //   const { value, checked } = e.currentTarget;
  //   if (checked) {
  //     const result = removeSelectedChildrenCategories(
  //       selectedCategoriesIds.value,
  //       value,
  //       category
  //     );
  //     selectedCategoriesIds.value = [
  //       ...selectedCategoriesIds.value.filter((id) => !result.includes(id)),
  //       value,
  //     ];
  //   } else {
  //     const valuesToRemove = Array.isArray(value) ? value : [value];
  //     selectedCategoriesIds.value = selectedCategoriesIds.value.filter(
  //       (id) => !valuesToRemove.includes(id)
  //     );
  //   }
  // };

  const disabled =
    category.parent_category_id &&
    selectedCategoriesIds.value.includes(category.parent_category_id);

  const handleAccordion = () => {
    if (disabled || !category.category_children.length) return;
    if (activeCategory.value === category.id) {
      activeCategory.value = null;
      const result = removeSelectedChildrenCategories(
        selectedCategoriesIds.value,
        category.id,
        category
      );
      console.log(result);
    } else {
      activeCategory.value = category.id;
    }
  };

  return (
    <ul>
      <li>
        <div
          class={`flex item-center my-1 rounded-md p-2 ${
            activeCategory.value === category.id
              ? "bg-gray-50"
              : "bg-transparent"
          }`}
        >
          <Checkbox
            name={category.name}
            onChange={handleCheck}
            value={category.id}
            className={`${disabled ? "!text-disabled" : ""}`}
            checked={
              disabled || selectedCategoriesIds.value.includes(category.id)
            }
            disabled={!!disabled}
          />
          <div
            class={`flex justify-between w-full cursor-pointer `}
            onClick={handleAccordion}
          >
            <Typography
              className={cx(
                category.category_children.length || depth === 0
                  ? "font-semibold"
                  : "font-normal",
                disabled && "text-disabled"
              )}
              style={{
                paddingLeft: `${depth + 1}rem`,
              }}
            >
              {category.name}
            </Typography>

            <span
              class={`${
                selectedCategoriesIds.value.includes(category.id)
                  ? "block"
                  : "hidden"
              }`}
            >
              {selectedCategoriesIds.value.length}
            </span>

            {disabled || !activeCategory.value ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class={`text-gray-400 h-5 w-5 shrink-0  ${
                  category.category_children.length ? "block" : "hidden"
                } `}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class={`text-gray-400 h-5 w-5 shrink-0 
           ${category.category_children.length ? "block" : "hidden"} `}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
          </div>
        </div>
        <div
          className={`${
            disabled || activeCategory.value !== category.id
              ? "hidden"
              : "block"
          }`}
        >
          {category.category_children.length
            ? category.category_children.map((child_cate) => (
                <Category
                  categories={categories}
                  category={child_cate}
                  depth={depth + 1}
                />
              ))
            : ""}
        </div>
      </li>
    </ul>
  );
};

export default Category;
