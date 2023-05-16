import type { ChangeEvent } from "preact/compat";
import Button from "@components/Button";
import { cart, cartOpen } from "@store/cartStore";
import ProductVariants from "@components/ProductVariants";
import { Signal, signal } from "@preact/signals";
import { addLineItem } from "@api/addLineItem";
import { createCart } from "@api/createCart";

interface Props {
  productId: string;
  productTitle: string;
  productImage: string;
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
    price: Signal<number | undefined>;
  };
}
const loadingSignal = signal<boolean>(false);

const AddToCartForm = ({
  productVariants,
  selectedVariant,
}: Props) => {
  const handleAddCart = async (e: ChangeEvent) => {
    e.preventDefault();
    const localCartId = localStorage.getItem("cartId");
    if (selectedVariant.id.value) {
      try {
        loadingSignal.value = true
        if (localCartId) {
          const res = await addLineItem({
            cardId: localCartId,
            variant_id: selectedVariant.id.value,
            quantity: 1,
          });

          cart.value = res.cart;
        } else {
          const res = await createCart({
            variant_id: selectedVariant.id.value,
            quantity: 1,
          });

          localStorage.setItem("cartId", res.cart.id);
          cart.value = res.cart;
        }
        cartOpen.value = true
      } catch { /* */ } finally {
        loadingSignal.value = false
      }
    }
  };
  localStorage.setItem("cart", JSON.stringify(cart.value));
  return (
    <div class="mt-6">
      <form onSubmit={handleAddCart}>
        <ProductVariants
          productVariants={productVariants}
          selectedVariant={selectedVariant}
        />
        <div class="sm:flex-col1 mt-10 flex gap-8 max-w-xs">
          <Button type="submit" title="Add to cart" disabled={loadingSignal.value} variant={"primary"}>
            {loadingSignal.value ? 'Loading...' : 'Add to cart'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddToCartForm;
