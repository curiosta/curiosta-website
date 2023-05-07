import type { ChangeEvent } from "preact/compat";
import Button from "@components/Button";
import { cart } from "@store/cartStore";
import ProductVariants from "@components/ProductVariants";
import { Signal, signal } from "@preact/signals";
import Typography from "@components/Typography";
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

const isPopUp = signal(false);

const AddToCartForm = ({
  productTitle,
  productImage,
  productVariants,
  selectedVariant,
}: Props) => {
  const handleAddCart = async (e: ChangeEvent) => {
    e.preventDefault();
    const localCartId = localStorage.getItem("cartId");
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
          variant_id: selectedVariant.id.value,
          quantity: 1,
        });

        localStorage.setItem("cartId", res.cart.id);
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
          productVariants={productVariants}
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
            <img src={productImage} alt="" class={" w-20  object-cover  "} />
            <div>
              <Typography size="body1/medium">{productTitle}</Typography>
              <Typography> Variant: {selectedVariant.title}</Typography>
              <Typography> Price: ${selectedVariant.price}</Typography>
              <Typography size="body1/medium" className="text-green-500 ">
                Added to cart
              </Typography>
            </div>
          </div>
          <a
            href="/cart"
            class={` text-white text-center bg-indigo-700 py-1 px-1 rounded-md `}
          >
            Go to cart
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddToCartForm;
