import { useEffect } from "preact/compat";
import { useSignal } from "@preact/signals";
import { listProducts } from "@api/product/listProducts";
import Typography from "./Typography";
import CategoriesOpt from "./CategoriesOpt";
import {
  count,
  limit,
  offset,
  order,
  products,
  selectedCategoriesIds,
} from "@store/productStore";

import Pagination from "@components/Pagination";
import type { ProductCategory } from "@medusajs/medusa";
import ProductCards from "@components/ProductCards";
import Button from "@components/Button";

interface Props {
  categories: ProductCategory[];
}

const ProductFilter = ({ categories }: Props) => {
  // const isSortPopUp = useSignal(false);
  const isLoading = useSignal(false);

  // const sortOptions = [
  //   { id: 1, title: "Newest", value: "-created_at" },
  //   { id: 2, title: "Oldest", value: "created_at" },
  // ];

  const productsList = async () => {
    try {
      isLoading.value = true;
      const res = await listProducts({
        category_id: selectedCategoriesIds.value,
        limit: limit.value,
        offset: offset.value,
        order: order.value ? order.value : undefined,
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
  }, [selectedCategoriesIds.value, offset.value, order.value]);

  return (
    <div class="mx-auto max-w-2xl !pb-0 px-4  sm:px-6  lg:max-w-7xl lg:px-8">
      {/* <div class="flex items-center justify-end">
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
                class={`-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 ${isSortPopUp.value ? "rotate-180" : "rotate-0"
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
            class={`${isSortPopUp.value ? "block" : "hidden"
              } absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            <div class="py-1" role="none">
              {sortOptions.map((sortOption) => (
                <Button
                  type="button"
                  variant="secondary"
                  className={` ${sortOption.value === order.value
                      ? "bg-gray-50"
                      : "!font-normal"
                    }`}
                  onClick={() => {
                    order.value = sortOption.value;
                  }}
                >
                  {sortOption.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div> */}
      <div class="lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        <CategoriesOpt categories={categories} />

        {/* <!-- Product grid --> */}
        <div class="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3 ">
          {!isLoading.value ? (
            <ProductCards products={products.value} />
          ) : (
            <Typography tag="h5" size="h5/semi-bold">
              Loading...
            </Typography>
          )}
        </div>
      </div>

      <Pagination
        isLoading={isLoading}
        offset={offset}
        limit={limit}
        count={count}
      />
    </div>
  );
};

export default ProductFilter;
