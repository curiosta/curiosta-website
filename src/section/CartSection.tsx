import {
  cart,
  decreaseCartItem,
  increaseCartItem,
  removeCartItem,
} from "@store/cartStore";
import Button from "@components/Button";

const CartSection = () => {
  localStorage.setItem("cart", JSON.stringify(cart.value));

  // console.log(cart.value);

  return (
    <section aria-labelledby="cart-heading" class="lg:col-span-7">
      <h2 id="cart-heading" class="sr-only">
        Items in your shopping cart
      </h2>

      <ul
        role="list"
        class="divide-y divide-gray-200 border-b border-t border-gray-200"
      >
        {cart.value.items?.length ? (
          cart.value?.items.map((item) => (
            <li class="flex py-6 sm:py-10">
              <div class="flex-shrink-0">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  class="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                />
              </div>

              <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                  <div>
                    <div class="flex justify-between">
                      <h3 class="text-sm">
                        <a
                          href={`/products/${item.variant.product_id}`}
                          class="font-medium text-gray-700 hover:text-gray-800"
                        >
                          {item.title}
                        </a>
                      </h3>
                    </div>
                    <div class="mt-1 flex text-sm">
                      <p class="text-gray-500">Sienna</p>

                      <p class="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                        {item.description}
                      </p>
                    </div>
                    <p class="mt-1 text-sm font-medium text-gray-900">
                      ${item.unit_price}
                    </p>
                  </div>

                  <div class="mt-4 sm:mt-0 sm:pr-9">
                    <div className="flex items-center  gap-2">
                      <label for="quantity-0" class="sr-only">
                        Quantity, Basic Tee
                      </label>
                      <Button
                        type="button"
                        title="Decrease"
                        variant={"icon-active"}
                        onClick={() =>
                          decreaseCartItem(
                            cart.value.id,
                            item.id,
                            item.quantity
                          )
                        }
                        disabled={item.quantity <= 1}
                      >
                        <svg
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M10.75, 12H4a1, 1,0,0,1,0-2H16a1,1,0,0,1,0,2Z" />
                        </svg>
                      </Button>
                      <span
                        id="quantity-0"
                        name="quantity-0"
                        className="border border-slate-400  py-1 px-3"
                      >
                        {item.quantity}
                      </span>
                      <Button
                        type="button"
                        title="Add more"
                        variant={"icon-active"}
                        onClick={() =>
                          increaseCartItem(
                            cart.value.id,
                            item.id,
                            item.quantity
                          )
                        }
                      >
                        <svg
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                        </svg>
                      </Button>
                    </div>
                    <div class="absolute right-0 top-0">
                      <Button
                        type="button"
                        title="Remove"
                        variant={"icon"}
                        onClick={() => removeCartItem(cart.value.id, item.id)}
                      >
                        <span class="sr-only">Remove</span>
                        <svg
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path>
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>

                <p class="mt-4 flex space-x-2 text-sm text-gray-700">
                  <svg
                    class="h-5 w-5 flex-shrink-0 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>In stock</span>
                </p>
              </div>
            </li>
          ))
        ) : (
          <div className="flex justify-center items-center ">
            <svg
              class=" h-24  w-24 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <span className="text-gray-900 text-sm font-medium">
              Your cart is empty
            </span>
          </div>
        )}
      </ul>
    </section>
  );
};

export default CartSection;
