import type { Signal } from "@preact/signals";
import Typography from "@components/Typography";
import useLocalStorage from "@hooks/useLocalStorage";
import type { PricedVariant } from "@medusajs/medusa/dist/types/pricing";
import type { Region } from "@medusajs/medusa";

interface Props {
  productVariants?: PricedVariant[];
  selectedVariant: {
    id: Signal<string | undefined>;
    title: Signal<string | undefined>;
    price: Signal<number | undefined>;
  };
}

const ProductVariants = ({ productVariants, selectedVariant }: Props) => {
  const { get } = useLocalStorage();
  const localRegion = get("region");

  const handleVariant = (
    id: string,
    title: string,
    prices: { currency_code: string; amount: number }[]
  ) => {
    selectedVariant.id.value = id;
    selectedVariant.title.value = title;
    selectedVariant.price.value = prices.find(
      (item) => item.currency_code === localRegion?.currency_code
    )?.amount;
  };

  return (
    <div>
      <div class="flex items-center justify-between">
        <Typography size="body2/medium" variant="primary">
          Variants
        </Typography>
      </div>
      <fieldset class="mt-2">
        <legend class="sr-only">Choose a Variant</legend>
        <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {productVariants?.length
            ? productVariants.map((variant) => (
              <label
                class={`flex items-center ${variant.title === selectedVariant.title.value
                  ? "border-transparent bg-primary-600 text-white hover:bg-primary-700"
                  : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                  } justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none`}
              >
                <input
                  type="radio"
                  name="variant-choice"
                  value={variant.title}
                  class="sr-only"
                  onInput={() =>
                    variant.id && variant.title && variant.prices
                      ? handleVariant(
                        variant.id,
                        variant.title,
                        variant.prices
                      )
                      : undefined
                  }
                  aria-labelledby="variant-choice-0-label"
                />
                <span id="variant-choice-0-label">{variant.title}</span>
              </label>
            ))
            : "Product variant not available"}
        </div>
      </fieldset>
    </div>
  );
};

export default ProductVariants;
