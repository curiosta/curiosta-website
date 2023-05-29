import Checkbox from "@components/Checkbox";
import Typography from "@components/Typography";
import type { ProductCategory } from "@medusajs/medusa";
import { useSignal } from "@preact/signals";
import { selectedCategoriesIds } from "@store/productStore";
import { cx } from "class-variance-authority";
import type { ChangeEvent } from "preact/compat";

interface Props {
  category: ProductCategory;
  depth: number;
}

const Category = ({ category, depth }: Props) => {
  const activeCategory = useSignal<string | null>(null);
  const isDisable = useSignal(false);

  // select categories
  const handleCheck = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.currentTarget;
    if (checked) {
      selectedCategoriesIds.value = [...selectedCategoriesIds.value, value];
    } else {
      selectedCategoriesIds.value = selectedCategoriesIds.value.filter(
        (id) => id !== value
      );
    }
  };

  const disabled =
    category.parent_category_id &&
    selectedCategoriesIds.value.includes(category.parent_category_id);

  const handleAccordion = () => {
    if (disabled) return;
    if (activeCategory.value === category.id) {
      activeCategory.value = null;
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
            className={`${disabled ? "text-disabled" : ""}`}
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
                <Category category={child_cate} depth={depth + 1} />
              ))
            : ""}
        </div>
      </li>
    </ul>
  );
};

export default Category;
