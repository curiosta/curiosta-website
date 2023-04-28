import type { ChangeEvent } from "preact/compat";
import Button from "./Button";
import { addItemToCart } from "../store/cartStore";
import { cartItems } from "../store/cartStore";
import ProductVariants from "./ProductVariants";
import { Signal, signal } from "@preact/signals";

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
    inventoryQty: Signal<number | undefined>;
    price: Signal<number | undefined>;
  };
}

const isPopUp = signal(false);
const AddToCartForm = ({
  productId,
  productTitle,
  productImage,
  productVariants,
  selectedVariant,
}: Props) => {
  const handleAddCart = (e: ChangeEvent) => {
    e.preventDefault();
    addItemToCart({
      id: productId,
      name: productTitle,
      imageSrc: productImage,
      variant: selectedVariant && selectedVariant,
    });
    isPopUp.value = true;
  };
  localStorage.setItem("cartItem", JSON.stringify(cartItems.value));

  return (
    <div class="mt-6 ">
      <form onSubmit={handleAddCart}>
        <ProductVariants
          productVariants={productVariants}
          selectedVariant={selectedVariant && selectedVariant}
        />
        <div class="sm:flex-col1 mt-10 flex gap-8">
          <Button
            type="submit"
            class={`flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full`}
            title="Add to cart"
            btnLabel={` Add to cart`}
          />
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
              <p class="font-medium ">{productTitle}</p>
              <p> Variant: {selectedVariant.title}</p>
              <p>Price: ${selectedVariant.price}</p>
              <p class="text-green-500 font-medium ">Added to cart</p>
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
