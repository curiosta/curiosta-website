import type { ChangeEvent } from "preact/compat";
import Button from "@components/Button";
import ProductVariants from "@components/ProductVariants";
import { Signal, effect, signal } from "@preact/signals";
import useLocalStorage from "@hooks/useLocalStorage";
import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import cart from "@api/cart";

interface Props {
  product: PricedProduct;
  selectedVariant: {
    id: Signal<string | undefined>;
    title: Signal<string | undefined>;
    price: Signal<number | undefined>;
  };
}
const loadingSignal = signal<boolean>(false);

const AddToCartForm = ({ product, selectedVariant }: Props) => {
  const handleAddCart = async (e: ChangeEvent) => {
    e.preventDefault();
    if (selectedVariant.id.value) {
      loadingSignal.value = true;
      await cart.addItem(selectedVariant.id.value)
      loadingSignal.value = false
      cart.open.value = true;
    } else {
      alert("Can't add to card because variant id not found");
    }
  };

  return (
    <div class="mt-6">
      <form onSubmit={handleAddCart}>
        <ProductVariants
          productVariants={product.variants}
          selectedVariant={selectedVariant}
        />
        <div class="sm:flex-col1 mt-10 flex gap-8 max-w-xs">
          <Button
            type="submit"
            title="Add to cart"
            disabled={loadingSignal.value}
            variant={"primary"}
          >
            {loadingSignal.value ? "Loading..." : "Add to cart"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddToCartForm;
