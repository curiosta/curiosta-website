import type { ChangeEvent } from "preact/compat";
import Button from "./Button";
import { addCartItem } from "../store/cartStore";
import { cartItems } from "../store/cartStore";
import { useRef } from "preact/compat";
import ProductVariants from "./ProductVariants";
import type { Signal } from "@preact/signals";

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

const AddToCartForm = ({
  productId,
  productTitle,
  productImage,
  productVariants,
  selectedVariant,
  price,
}: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleAddCart = (e: ChangeEvent) => {
    e.preventDefault();
    addCartItem({
      id: productId,
      name: productTitle,
      imageSrc: productImage,
      variant: selectedVariant.value,
      price: price,
    });
    dialogRef.current?.show();
  };
  localStorage.setItem("cartItem", JSON.stringify(cartItems.value));

  return (
    <div class="mt-6 relative">
      <form onSubmit={handleAddCart}>
        <ProductVariants
          productVariants={productVariants}
          selectedVariant={selectedVariant}
        />
        <div class="sm:flex-col1 mt-10 flex gap-8">
          <Button
            type="submit"
            class={`flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full`}
            btnLabel={` Add to cart`}
          />
        </div>
      </form>
      {/* popup */}
      <dialog
        class={
          "p-3 border rounded-lg  w-[200px] bg-white absolute left-10 z-10 after:absolute after:border-[15px] after:border-transparent after:border-t-0 after:border-b-[15px] after:border-solid after:border-b-white after:top-[-15px] after:left-10 "
        }
        ref={dialogRef}
      >
        <div class="flex flex-col">
          <div class="flex  items-center gap-4 mb-4 pt-3 relative">
            <span
              class="absolute -top-4 -right-1 text-lg cursor-pointer "
              onClick={() => dialogRef.current?.close()}
            >
              x
            </span>
            <img src={productImage} alt="" class={"h-8 w-8"} />
            <span class="text-green-500 font-medium ">Added to cart</span>
          </div>
          <a
            href="/cart"
            class={` text-white text-center bg-indigo-700 py-1 px-1 rounded-md `}
          >
            Go to cart
          </a>
        </div>
      </dialog>
    </div>
  );
};

export default AddToCartForm;
