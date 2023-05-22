import ProductContainer from "./ProductContainer";
import type { CategoriesList } from "@api/product/categoriesList";
import { useEffect } from "preact/compat";
import { useSignal } from "@preact/signals";
import { listProducts } from "@api/product/listProducts";
import Typography from "./Typography";
import useLocalStorage from "@hooks/useLocalStorage";
import Button from "@components/Button";
import CategoriesOpt from "./CategoriesOpt";
import {
  count,
  limit,
  offset,
  products,
  selectedCategoriesIds,
} from "@store/productStore";

import Pagination from "@components/Pagination";

interface Props {
  categories: CategoriesList[];
}

const ProductFilter = ({ categories }: Props) => {
  const isSortPopUp = useSignal(false);
  const isLoading = useSignal(true);

  const productsList = async () => {
    try {
      const res = await listProducts({
        category_id: selectedCategoriesIds.value,
        limit: limit.value,
        offset: offset.value,
      });
      products.value = res?.products;
      count.value = res?.count;
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  useEffect(() => {
    productsList();
  }, [selectedCategoriesIds.value, offset.value]);

  return (
    <div class="mx-auto max-w-2xl !pb-0 px-4 py-24 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div class="flex items-center justify-end">
        <div class="relative inline-block text-left">
          <div>
            <Button
              type="button"
              variant="icon"
              className="!border-none"
              id="menu-button"
              onClick={() => (isSortPopUp.value = !isSortPopUp.value)}
            >
              Sort
              <svg
                class={`-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 ${
                  isSortPopUp.value ? "rotate-180" : "rotate-0"
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </Button>
          </div>

          <div
            class={`${
              isSortPopUp.value ? "block" : "hidden"
            } absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            <div class="py-1" role="none">
              <Button
                variant="secondary"
                className="!font-normal  "
                id="menu-item-3"
              >
                Price: Low to High
              </Button>
              <Button
                variant="secondary"
                className="!font-normal"
                id="menu-item-4"
              >
                Price: High to Low
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div class="lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        <CategoriesOpt categories={categories} />

        {/* <!-- Product grid --> */}
        <div class="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
          {!isLoading.value ? (
            <ProductContainer products={products.value} page={"Productpage"} />
          ) : (
            <Typography tag="h5" size="h5/semi-bold">
              Loading...
            </Typography>
          )}
        </div>
      </div>
      {count.value ? (
        <Pagination offset={offset} limit={limit} count={count.value} />
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductFilter;
