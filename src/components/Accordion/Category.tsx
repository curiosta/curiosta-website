import Checkbox from "@components/Checkbox";
import type { TProductsQueryParam } from "@components/Products";
import Typography from "@components/Typography";
import type { ProductCategory } from "@medusajs/medusa";
import type { Signal } from "@preact/signals";
import type { Product } from "@store/productStore";
import getProductsFromUrl from "@utils/getProductsFromUrl";
import type { ChangeEvent } from "preact/compat";
interface Props {
  category: ProductCategory;
  depth: number;
  params: Signal<Partial<TProductsQueryParam>>;
  products: Signal<Product[]>;
  selectedCategoriesIds: Signal<string[]>
  toggleSelectedIds: (id: string) => void;
}

const Category = ({ category, products, selectedCategoriesIds, toggleSelectedIds }: Props) => {
  // checkbox
  const handleCheck = async (e: ChangeEvent<HTMLInputElement>) => {
    toggleSelectedIds((e.target as any).value)

    const url = new URL(window.location.href)
    url.searchParams.set('categories', selectedCategoriesIds.value.join(','))
    window.history.replaceState(undefined, '', url.href);
    const { result, params } = await getProductsFromUrl(url.href);
    products.value = result.products;
  };

  return (
    <ul>
      <li>
        <label
          class={`flex item-center my-1 rounded-md p-2 bg-transparent`}
        >
          <Checkbox
            name={category.name}
            onChange={handleCheck}
            value={category.id}
            checked={
              selectedCategoriesIds.value.includes(category.id)
            }
          />
          <div
            class={`flex justify-between w-full cursor-pointer`}
          >
            <Typography
              className={"font-semibold"}
              style={{
                paddingLeft: `1rem`,
              }}
            >
              {category.name}
            </Typography>
          </div>
        </label>
      </li>
    </ul>
  );
};

export default Category;
