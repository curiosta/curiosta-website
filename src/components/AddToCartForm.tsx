import type { ChangeEvent } from "preact/compat";
import Button from "@components/Button";
import { cart, cartOpen } from "@store/cartStore";
import ProductVariants from "@components/ProductVariants";
import { Signal, signal } from "@preact/signals";
import { addLineItem } from "@api/cart/addLineItem";
import { createCart } from "@api/cart/createCart";
import type { Product } from "@api/product/index.d";
import { getUser } from "@api/user/getUser";
import useLocalStorage from "@hooks/useLocalStorage";
import type { CurrencyMap } from "./CurrencyMap";

interface Props {
  product: Product;
  selectedVariant: {
    id: Signal<string | undefined>;
    title: Signal<string | undefined>;
    price: Signal<number | undefined>;
  };
}
const loadingSignal = signal<boolean>(false);

const AddToCartForm = ({ product, selectedVariant }: Props) => {
  const { get, set } = useLocalStorage();
  const localRegion = get<{ id?: string; curr_code?: string }>("region");
  const currency = localRegion?.curr_code as keyof CurrencyMap;


  const handleAddCart = async (e: ChangeEvent) => {
    e.preventDefault();
    await getUser();
    const localCartId = get("cartId");

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
            region_id: localRegion?.id,
            variant_id: selectedVariant.id.value,
            quantity: 1,
          });

          set("cartId", res.cart.id);
          cart.value = res.cart;
        }
        cartOpen.value = true;
      } catch { } finally { loadingSignal.value = false }
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
          <Button type="submit" title="Add to cart" disabled={loadingSignal.value} variant={"primary"}>
            {loadingSignal.value ? 'Loading...' : 'Add to cart'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddToCartForm;
