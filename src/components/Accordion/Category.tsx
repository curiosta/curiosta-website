import type { CategoriesList } from "@api/product/categoriesList";
import Button from "@components/Button";
import Checkbox from "@components/Checkbox";
import { useSignal } from "@preact/signals";
import { selectedCategoriesIds } from "@store/productStore";
import type { ChangeEvent } from "preact/compat";

interface Props {
  category: CategoriesList;
}

const Category = ({ category }: Props) => {
  const activeCategory = useSignal<string | null>(null);

  const hanldeAccordion = () => {
    if (activeCategory.value === category.id) {
      activeCategory.value = null;
      selectedCategoriesIds.value = selectedCategoriesIds.value.filter(
        (id) => id !== category.id
      );
    } else {
      activeCategory.value = category.id;
      selectedCategoriesIds.value = [
        ...selectedCategoriesIds.value,
        category.id,
      ];
    }
  };

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

  return (
    <ul>
      <li>
        <div>
          <Button
            type="button"
            variant="icon"
            className={`!w-auto !shadow-none !border-none ${
              activeCategory.value ? "!font-semibold" : "!font-normal"
            } `}
            onClick={hanldeAccordion}
          >
            <svg
              class={`text-gray-400 h-5 w-5 shrink-0 ${
                activeCategory.value
                  ? selectedCategoriesIds.value.includes(activeCategory.value)
                    ? "rotate-90"
                    : "rotate-0"
                  : null
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd"
              />
            </svg>
            {category.name}
          </Button>
        </div>
        <div
          className={`${
            activeCategory.value === category.id ? "block" : "hidden"
          } pl-6`}
        >
          {category.category_children.length ? (
            category.category_children.map((child_cate) => (
              <div class="flex items-center gap-2 ">
                <Checkbox
                  name={child_cate.name}
                  label={child_cate.name}
                  onChange={handleCheck}
                  value={child_cate.id}
                  checked={selectedCategoriesIds.value.includes(child_cate.id)}
                />
              </div>
            ))
          ) : (
            <span class="text-sm">No sub categories</span>
          )}
        </div>
      </li>
    </ul>
  );
};

export default Category;
