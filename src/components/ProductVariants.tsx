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
  selectedVariant: {
    id: Signal<string | undefined>;
    title: Signal<string | undefined>;
    inventoryQty: Signal<number | undefined>;
    price: Signal<number | undefined>;
  };
}

const ProductVariants = ({ productVariants, selectedVariant }: Props) => {
  const handleVariant = (
    id: string,
    title: string,
    prices: { amount: number },
    inventoryQty: number
  ) => {
    selectedVariant.id.value = id;
    selectedVariant.title.value = title;
    selectedVariant.inventoryQty.value = inventoryQty;
    selectedVariant.price.value = prices.amount / 100;
  };

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
                variant.title === selectedVariant.title.value
                  ? "border-transparent bg-indigo-600 text-white hover:bg-indigo-700"
                  : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
              } justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none`}
            >
              <input
                type="radio"
                name="variant-choice"
                value={variant.title}
                class="sr-only"
                onInput={() =>
                  handleVariant(
                    variant.id,
                    variant.title,
                    variant.prices[1],
                    variant.inventory_quantity
                  )
                }
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
