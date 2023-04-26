import type { Signal } from "@preact/signals";

interface Props {
  productVariants: {
    id: string;
    title: string;
    inventory_quantity: number;
    prices: {
      currency_code: string;
      amount: number;
    }[];
  }[];
  selectedVariant: Signal<string>;
}

const ProductVariants = ({ productVariants, selectedVariant }: Props) => {
  return (
    <div>
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-medium text-gray-900">Variants</h2>
      </div>
      <fieldset class="mt-2">
        <legend class="sr-only">Choose a Variant</legend>
        <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {productVariants.map((variant) => (
            <label
              class={`flex items-center ${
                variant.title === selectedVariant.value
                  ? "border-transparent bg-indigo-600 text-white hover:bg-indigo-700"
                  : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
              } justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none`}
            >
              <input
                type="radio"
                name="variant-choice"
                value={variant.title}
                class="sr-only"
                onInput={(e) => (selectedVariant.value = e.currentTarget.value)}
                aria-labelledby="variant-choice-0-label"
              />
              <span id="variant-choice-0-label">{variant.title}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default ProductVariants;
