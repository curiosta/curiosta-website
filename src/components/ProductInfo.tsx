import { useSignal } from "@preact/signals";
import AddToCartForm from "@components/AddToCartForm";
import Typography from "@components/Typography";
import type { Product } from "@api/product/index.d";
import useLocalStorage from "@hooks/useLocalStorage";
import { CurrencyMap, currencyMap } from "./CurrencyMap";

interface Props {
  product: Product;
}

const ProductInfo = ({ product }: Props) => {
  const defaultVariant = product?.variants?.at(0);
  const { get } = useLocalStorage();
  const localRegion = get("region");

  const amount = defaultVariant?.prices.find(
    (item) => item.currency_code === localRegion?.curr_code
  )?.amount;
  const currency = localRegion?.curr_code as keyof CurrencyMap;

  const selectedVariant = {
    id: useSignal(defaultVariant?.id),
    title: useSignal(defaultVariant?.title),
    price: useSignal(amount),
  };

  return (
    <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <Typography
        tag="h3"
        size="h3/bold"
        variant="primary"
        className="tracking-tight"
      >
        {product?.title || "N/A"}
      </Typography>
      <div class="mt-3">
        <Typography className="sr-only">Product information</Typography>
        <Typography
          tag="h3"
          size="h3/normal"
          variant="primary"
          className="tracking-tight"
        >
          {currencyMap[currency]}
          {selectedVariant.price.value
            ? (selectedVariant.price?.value / 100).toFixed(2)
            : "N/A"}
        </Typography>
      </div>
      {/* Reviews  */}
      <div class="mt-3">
        <Typography className="sr-only">Reviews</Typography>
        <div class="flex items-center">
          <div class="flex items-center">
            {Array(5)
              .fill(1)
              .map((val, index) => (
                <svg
                  class={`h-5 w-5 flex-shrink-0 ${
                    index === 4 ? "text-gray-300" : "text-indigo-500"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clip-rule="evenodd"
                  />
                </svg>
              ))}
          </div>
          <Typography className="sr-only">4 out of 5 stars</Typography>
        </div>
      </div>
      <div class="mt-6">
        <Typography className="sr-only">Description</Typography>

        <div class="space-y-6 text-base text-gray-700">
          <Typography>
            {product?.description || "Description not available!"}
          </Typography>
        </div>
      </div>

      <AddToCartForm product={product} selectedVariant={selectedVariant} />

      <section aria-labelledby="details-heading" class="mt-12">
        <Typography id="details-heading" className="sr-only">
          Additional details
        </Typography>

        <div class="divide-y divide-gray-200 border-t">
          <div>
            <Typography size="h3/bold">
              <button
                type="button"
                class="group relative flex w-full items-center justify-between py-6 text-left"
                aria-controls="disclosure-1"
                aria-expanded="false"
              >
                <span class="text-gray-900 text-sm font-medium">Features</span>
                <span class="ml-6 flex items-center">
                  <svg
                    class="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    ></path>
                  </svg>

                  <svg
                    class="hidden h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 12h-15"
                    ></path>
                  </svg>
                </span>
              </button>
            </Typography>
            <div class="prose prose-sm pb-6" id="disclosure-1">
              <ul role="list">
                <li>Multiple strap configurations</li>

                <li>Spacious interior with top zip</li>

                <li>Leather handle and tabs</li>

                <li>Interior dividers</li>

                <li>Stainless strap loops</li>

                <li>Double stitched construction</li>

                <li>Water-resistant</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductInfo;
