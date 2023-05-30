import type { ChangeEvent } from "preact/compat";
import Button from "@components/Button";
import { cart, cartOpen } from "@store/cartStore";
import ProductVariants from "@components/ProductVariants";
import { Signal, signal } from "@preact/signals";
import { addLineItem } from "@api/cart/addLineItem";
import { createCart } from "@api/cart/createCart";
import useLocalStorage from "@hooks/useLocalStorage";
import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import type { Region } from "@medusajs/medusa";

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
  const { get, set } = useLocalStorage();
  const localRegion = get<Region>("region");

  const handleAddCart = async (e: ChangeEvent) => {
    e.preventDefault();
    const localCartId = get("cartId");

    if (selectedVariant.id.value) {
      try {
        loadingSignal.value = true;
        if (localCartId) {
          const res = await addLineItem({
            cardId: localCartId,
            variant_id: selectedVariant.id.value,
            quantity: 1,
          });

          cart.value = res.cart;
        } else {
          const res = await createCart({
            region_id: localRegion?.id,
            variant_id: selectedVariant.id.value,
            quantity: 1,
          });

          set("cartId", res.cart.id);
          cart.value = res.cart;
        }
        cartOpen.value = true;
      } catch {
      } finally {
        loadingSignal.value = false;
      }
    } else {
      alert("Can't add to card because variant id not found");
    }
  };
  localStorage.setItem("cart", JSON.stringify(cart.value));
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
