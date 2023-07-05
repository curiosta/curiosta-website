import { countState, limitState, offsetState, pageState, type TGetProductResult } from "@api/search";
import Button from "@components/Button";
import type { Signal } from "@preact/signals";
import type { Product } from "@store/productStore";
import getProductsFromUrl from "@utils/getProductsFromUrl";
import { cx } from "class-variance-authority";

interface Props extends Omit<Partial<TGetProductResult>, 'products'> {
  products: Signal<Product[]>;
}

const Pagination = ({ products }: Props) => {
  const getAndUpdateProductsFromURL = async (url: URL) => {
    window.history.replaceState(undefined, '', url.href)

    // get products
    const { result } = await getProductsFromUrl(url.href)
    products.value = result.products;
  }

  const handleNext = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', `${pageState.value + 1}`);
    await getAndUpdateProductsFromURL(url)
  };

  const handlePrev = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', `${pageState.value - 1}`);
    await getAndUpdateProductsFromURL(url)
  };

  const isEndResult = countState.value
    ? offsetState.value + limitState.value >= countState.value
    : null;

  return (
    <div
      class={cx(
        "items-center justify-between border-t border-gray-200 bg-white mt-20 px-4 py-3 sm:px-6",
        countState.value ? "flex" : "hidden"
      )}
      aria-label="Pagination"
    >
      <div class="hidden sm:block">
        <p class="text-sm text-gray-700 flex gap-1">
          Showing
          <span class="font-medium">{countState.value ? offsetState.value + 1 : 0}</span>-
          <span class="font-medium">
            {isEndResult ? countState.value : offsetState.value + limitState.value || 0}
          </span>
          of
          <span class="font-medium">{countState.value || 0}</span>
          results
        </p>
      </div>
      <div class="flex flex-1 justify-between sm:justify-end gap-4">
        <Button
          type="button"
          className={`!w-fit !px-3 !py-2 ${offsetState.value <= 0 ? "hidden" : "inline-flex"
            }`}
          onClick={handlePrev}
          disabled={offsetState.value <= 0}
        >
          Previous
        </Button>
        <Button
          type="button"
          className={`!w-fit !px-3 !py-2 ${isEndResult ? "hidden" : "inline-flex"
            }`}
          onClick={handleNext}
          disabled={isEndResult === true}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
