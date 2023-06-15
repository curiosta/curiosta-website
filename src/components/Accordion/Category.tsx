import Checkbox from "@components/Checkbox";
import type { TProductsQueryParam } from "@components/Products";
import Typography from "@components/Typography";
import type { ProductCategory } from "@medusajs/medusa";
import { Signal, useSignal } from "@preact/signals";
import type { Product } from "@store/productStore";
import getProductsFromUrl from "@utils/getProductsFromUrl";
import getCategorySelectedChildIDs from "@utils/getSelectedParentChildrenCategories";
import { cx } from "class-variance-authority";
import type { ChangeEvent } from "preact/compat";
interface Props {
  category: ProductCategory;
  depth: number;
  params: Signal<Partial<TProductsQueryParam>>;
  products: Signal<Product[]>
}

const Category = ({ category, products, depth, params }: Props) => {
  const activeCategory = useSignal<string | null>(null);
  const selectedChildCategoryCount = useSignal<number>(0);
  const selectedCategoriesIds = useSignal(!params.value.categories ? [] : (typeof params.value.categories === 'string' ? [params.value.categories] : params.value.categories))
  const disabled =
    category.parent_category_id &&
    selectedCategoriesIds.value.includes(category.parent_category_id);

  // checkbox
  const handleCheck = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.currentTarget;
    if (checked) {
      const childIdsToRemove = getCategorySelectedChildIDs(
        selectedCategoriesIds.value,
        category
      );
      selectedCategoriesIds.value = [
        ...selectedCategoriesIds.value.filter(
          (id) => !childIdsToRemove.includes(id)
        ),
        value,
      ];
    } else {
      selectedCategoriesIds.value = selectedCategoriesIds.value.filter(
        (id) => id !== value
      );
    }

    const url = new URL(window.location.href)
    url.searchParams.set('categories', selectedCategoriesIds.value.join(','))
    window.history.replaceState(undefined, '', url.href);
    const { result } = await getProductsFromUrl(url.href);
    products.value = result.products;
  };

  // accordion item click
  const handleAccordion = () => {
    // don't toggle accordion state if disabled or if it does not have any children.
    if (disabled || !category.category_children.length) return;

    // reset child category count
    if (selectedChildCategoryCount.value) selectedChildCategoryCount.value = 0;

    // toggle accordion state.
    if (activeCategory.value === category.id) {
      // get all current category's selected children count.
      selectedChildCategoryCount.value = getCategorySelectedChildIDs(
        selectedCategoriesIds.value,
        category
      ).length;

      activeCategory.value = null;
    } else {
      activeCategory.value = category.id;
    }
  };

  return (
    <ul>
      <li>
        <div
          class={`flex item-center my-1 rounded-md p-2 ${activeCategory.value === category.id
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
            <div className="flex items-center">
              {selectedChildCategoryCount.value ? (
                <Typography
                  size="body2/medium"
                  variant="app-primary"
                  className="bg-primary-600/10 w-6 h-6 flex items-center justify-center rounded-full"
                >
                  {selectedChildCategoryCount.value}
                </Typography>
              ) : null}
              {disabled || !activeCategory.value ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class={`text-gray-400 h-5 w-5 shrink-0  ${category.category_children.length ? "block" : "hidden"
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
        </div>
        <div
          className={`${disabled || activeCategory.value !== category.id
            ? "hidden"
            : "block"
            }`}
        >
          {category.category_children.length
            ? category.category_children.map((child_cate) => (
              <Category products={products} params={params} category={child_cate} depth={depth + 1} />
            ))
            : ""}
        </div>
      </li>
    </ul>
  );
};

export default Category;
