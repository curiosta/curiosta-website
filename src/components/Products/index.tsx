import { useEffect, useRef } from "preact/compat";
import { useSignal } from "@preact/signals";
import CategoriesOpt from "../CategoriesOpt";
import Pagination from "@components/Pagination";
import type { ProductCategory } from "@medusajs/medusa";
import Button from "@components/Button";
import ProductCard from "../ProductCard";
import './product.css'
import ProductCards from "@components/ProductCards";
import SearchInput from "./SearchInput";
import getProductsFromUrl from "@utils/getProductsFromUrl";
import { countState, limitState, offsetState, pageState, type TGetProductResult } from "@api/search";

export type TProductsQueryParam = {
  sort: 'asc' | 'desc',
  q: string,
  page: number,
  categories: string | string[],
}
interface Props {
  categories: ProductCategory[];
  productResult: TGetProductResult;
  queryParams: Partial<TProductsQueryParam>,
}

const Products = ({ categories, productResult, queryParams }: Props) => {
  const { products: initialProducts, count, limit, offset, page } = productResult


  const isSortPopUp = useSignal(false);
  const sortContainerRef = useRef<HTMLDivElement>(null);

  const products = useSignal(initialProducts);
  const params = useSignal(queryParams);

  const sortOptions = [
    { id: 1, title: "Price: High to Low", value: "desc" },
    { id: 2, title: "Price: Low to High", value: "asc" },
  ];

  // update signal state
  useEffect(() => {
    countState.value = count;
    limitState.value = limit;
    offsetState.value = offset;
    pageState.value = page;
  }, [])


  useEffect(() => {
    const clickAwayListener = (e: MouseEvent) => {
      if (sortContainerRef.current?.contains(e.target as any)) return;
      isSortPopUp.value = false
    }

    window.addEventListener('click', clickAwayListener)

    return () => {
      window.removeEventListener('click', clickAwayListener)
    }
  }, []);

  return (
    <div class="mx-auto max-w-2xl !pb-0 px-4  sm:px-6  lg:max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        <CategoriesOpt products={products} categories={categories} params={params} />

        {/* <!-- Product grid --> */}
        <div class="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3 ">

          <div class={`flex justify-between mb-6 items-center`}>
            {/* search option */}
            <SearchInput products={products} />
            {/* sort option */}
            <div class="relative inline-block text-left" ref={sortContainerRef}>
              <div>
                <Button
                  type="button"
                  variant="icon"
                  className="!border-none"
                  id="menu-button"
                  onClick={() => {
                    isSortPopUp.value = !isSortPopUp.value
                  }}
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
                      key={sortOption.id}
                      type="button"
                      variant="dropDown"
                      className={`!shadow-none ${sortOption.value === params.value.sort
                        ? "!bg-gray-100"
                        : "!font-normal"
                        }`}
                      onClick={async () => {
                        const url = new URL(window.location.href)
                        url.searchParams.set('sort', sortOption.value);
                        window.history.replaceState(undefined, '', url.href);
                        // get results and show
                        const { result } = await getProductsFromUrl(url.href);
                        products.value = result.products
                        // update selected sort option
                        params.value = { ...params.value, sort: sortOption.value as 'asc' | 'desc' | undefined }
                      }}
                    >
                      {sortOption.title}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <ProductCards products={products.value} />
        </div>
      </div>
      <Pagination
        products={products}
      />

    </div>
  );
};


export default Products;