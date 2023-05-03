import { useSignal } from "@preact/signals";
import AddToCartForm from "./AddToCartForm";

interface Props {
  productId: string;
  product: {
    title: string;
    description: string;
    imageSrc: string;
    id: string;
    images: {
      url: string;
    }[];
    variants: {
      id: string;
      title: string;
      inventory_quantity: number;
      prices: {
        currency_code: string;
        amount: number;
      }[];
    }[];
  };
}

const ProductInfo = ({ product, productId }: Props) => {
  const defaultVariant = product.variants.at(0);

  const selectedVariant = {
    id: useSignal(defaultVariant?.id),
    title: useSignal(defaultVariant?.title),
    inventoryQty: useSignal(defaultVariant?.inventory_quantity),
    price: useSignal(
      defaultVariant?.prices[1].amount && defaultVariant?.prices[1].amount / 100
    ),
  };

  return (
    <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">
        {product.title}
      </h1>
      <div class="mt-3">
        <h2 class="sr-only">Product information</h2>
        <p class="text-3xl tracking-tight text-gray-900">
          ${selectedVariant.price.value}
        </p>
      </div>
      {/* Reviews  */}
      <div class="mt-3">
        <h3 class="sr-only">Reviews</h3>
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
          <p class="sr-only">4 out of 5 stars</p>
        </div>
      </div>
      <div class="mt-6">
        <h3 class="sr-only">Description</h3>

        <div class="space-y-6 text-base text-gray-700">
          <p>{product.description}</p>
        </div>
      </div>

      <AddToCartForm
        productId={productId}
        productTitle={product.title}
        productImage={product.images[0].url}
        productVariants={product.variants}
        selectedVariant={selectedVariant}
      />

      <section aria-labelledby="details-heading" class="mt-12">
        <h2 id="details-heading" class="sr-only">
          Additional details
        </h2>

        <div class="divide-y divide-gray-200 border-t">
          <div>
            <h3>
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
            </h3>
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
