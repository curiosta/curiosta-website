import type { ChangeEvent } from "preact/compat";
import Button from "@components/Button";
import ProductVariants from "@components/ProductVariants";
import { Signal, effect, signal } from "@preact/signals";
import useLocalStorage from "@hooks/useLocalStorage";
import type { PricedProduct, PricedVariant } from "@medusajs/medusa/dist/types/pricing";
import cart from "@api/cart";
import type { MoneyAmount } from "@medusajs/medusa";

interface Props {
  product: PricedProduct;
  productIndex: Signal<number>
}
const loadingSignal = signal<boolean>(false);

const AddToCartForm = ({ product, productIndex }: Props) => {
  const handleAddCart = async (e: ChangeEvent) => {
    e.preventDefault();
    const selectedVariant = product.variants[productIndex.value];
    if (selectedVariant.id) {
      loadingSignal.value = true;
      try {
        await cart.addItem(selectedVariant.id)
        cart.open.value = true;
      } catch (error) {

      } finally {
        loadingSignal.value = false
      }
    } else {
      alert("Can't add to card because variant id not found");
    }
  };

  return (
    <div class="mt-6">
      <form onSubmit={handleAddCart}>
        <ProductVariants
          productVariants={product.variants}
          productIndex={productIndex}
        />
        <div class="sm:flex-col1 mt-10 flex gap-8 max-w-xs">
          <Button
            type="submit"
            title="Add to cart"
            disabled={loadingSignal.value || cart.loading.value === 'cart:get'}
            variant={"primary"}
          >
            {loadingSignal.value || cart.loading.value === 'cart:get' ? "Loading..." : "Add to cart"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddToCartForm;
