import type { TGetProductResult } from "@api/search";
import Button from "@components/Button";
import { useSignal, type Signal } from "@preact/signals";
import type { Product } from "@store/productStore";
import getProductsFromUrl from "@utils/getProductsFromUrl";
import { cx } from "class-variance-authority";

interface Props extends Omit<Partial<TGetProductResult>, 'products'> {
  offset: number;
  count: number;
  limit: number;
  products: Signal<Product[]>;
}

const Pagination = ({ offset, count, limit, products, page }: Props) => {
  const offsetState = useSignal(offset);
  const countState = useSignal(count);
  const limitState = useSignal(limit);
  const pageState = useSignal(page || 1);

  const handleNext = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', `${pageState.value + 1}`);
    window.history.replaceState(undefined, '', url.href)

    // get products
    const { result, params } = await getProductsFromUrl(url.href)
    products.value = result.products;

    // update states
    offsetState.value = result.offset;
    countState.value = result.count;
    limitState.value = result.limit;
    pageState.value = params.page || 1
  };
  const handlePrev = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', `${pageState.value - 1}`);
    window.history.replaceState(undefined, '', url.href)

    // get products
    const { result, params } = await getProductsFromUrl(url.href)
    products.value = result.products;

    // update states
    offsetState.value = result.offset;
    countState.value = result.count;
    limitState.value = result.limit;
    pageState.value = params.page || 1
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
