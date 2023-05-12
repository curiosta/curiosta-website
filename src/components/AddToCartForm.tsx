import type { ChangeEvent } from "preact/compat";
import Button from "@components/Button";
import { cart } from "@store/cartStore";
import ProductVariants from "@components/ProductVariants";
import { Signal, signal } from "@preact/signals";
import Typography from "@components/Typography";
import { addLineItem } from "@api/cart/addLineItem";
import { createCart } from "@api/cart/createCart";
import type { Product } from "@api/product/index.d";
import { getUser } from "@api/user/getUser";
import useLocalStorage from "@hooks/useLocalStorage";

interface Props {
  product: Product;
  selectedVariant: {
    id: Signal<string | undefined>;
    title: Signal<string | undefined>;
    price: Signal<number | undefined>;
  };
}

const isPopUp = signal(false);

const AddToCartForm = ({ product, selectedVariant }: Props) => {
  const { get, set } = useLocalStorage();

  const handleAddCart = async (e: ChangeEvent) => {
    e.preventDefault();
    await getUser();
    const localCartId: string = get("cartId");
    const localRegion = get("region");
    if (selectedVariant.id.value) {
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
    }

    isPopUp.value = true;
  };
  localStorage.setItem("cart", JSON.stringify(cart.value));
  return (
    <div class="mt-6 ">
      <form onSubmit={handleAddCart}>
        <ProductVariants
          productVariants={product.variants}
          selectedVariant={selectedVariant}
        />
        <div class="sm:flex-col1 mt-10 flex gap-8 max-w-xs">
          <Button type="submit" title="Add to cart" variant={"primary"}>
            Add to cart
          </Button>
        </div>
      </form>
      {/* popup */}
      <div
        class={`fixed right-0 bottom-0  w-full ${
          isPopUp.value ? "flex" : "hidden "
        }  justify-center items-center  bg-[#464646c4] p-3   z-20`}
      >
        {/* close popup */}
        <span
          class="absolute top-1 right-3 white  cursor-pointer "
          onClick={() => (isPopUp.value = false)}
        >
          <svg
            class="h-8 w-8 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </span>
        <div class="flex flex-col bg-white w-1/2 p-3 rounded-md ">
          <div class="flex  items-center gap-4 mb-4 pt-3 ">
            <img
              src={product.thumbnail ?? undefined}
              alt=""
              class={" w-20  object-cover  "}
            />
            <div>
              <Typography size="body1/medium">{product.title}</Typography>
              <Typography> Variant: {selectedVariant.title}</Typography>
              <Typography> Price: ${selectedVariant.price}</Typography>
              <Typography size="body1/medium" className="text-green-500 ">
                Added to cart
              </Typography>
            </div>
          </div>
          <Button link="/cart" className="text-center py-1 px-1 rounded-md">
            Go to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartForm;
