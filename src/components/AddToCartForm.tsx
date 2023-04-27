import type { ChangeEvent } from "preact/compat";
import Button from "./Button";
import { addCartItem } from "../store/cartStore";
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
  selectedVariant: Signal<string>;
  price: number;
}
const isPopUp = signal(false);
const AddToCartForm = ({
  productId,
  productTitle,
  productImage,
  productVariants,
  selectedVariant,
  price,
}: Props) => {
  const handleAddCart = (e: ChangeEvent) => {
    e.preventDefault();
    addCartItem({
      id: productId,
      name: productTitle,
      imageSrc: productImage,
      variant: selectedVariant.value,
      price: price,
    });
    isPopUp.value = true;
  };
  localStorage.setItem("cartItem", JSON.stringify(cartItems.value));

  return (
    <div class="mt-6 ">
      <form onSubmit={handleAddCart}>
        <ProductVariants
          productVariants={productVariants}
          selectedVariant={selectedVariant}
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
        <span
          class="absolute top-0 right-3  text-xl text-white font-bold cursor-pointer "
          onClick={() => (isPopUp.value = false)}
        >
          X
        </span>
        <div class="flex flex-col bg-white w-1/2 p-3 rounded-md ">
          <div class="flex  items-center gap-4 mb-4 pt-3 ">
            <img src={productImage} alt="" class={" w-20  object-cover  "} />
            <div>
              <p class="font-medium ">{productTitle}</p>
              <p class="  "> Variant: {selectedVariant}</p>
              <p class="  ">Price: ${price}</p>
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
