import AddressList from "@components/AddressList";
import Button from "@components/Button";
import OrderSummary from "@components/OrderSummary";
import useKeyboard from "@hooks/useKeyboard";
import { checkoutOpen } from "@store/checkoutStore";
import { cx } from "class-variance-authority";
import { createPortal } from "preact/compat";

const index = () => {
  const { add } = useKeyboard('Escape', { event: 'keydown' })
  // remove app's default scroll if cart is open
  document.body.style.overflow = checkoutOpen.value ? "hidden" : "auto";

  add('close-checkout-drawer', () => {
    checkoutOpen.value = false;
  })

  return createPortal(
    <div
      className={cx(
        `fixed w-full flex h-screen top-0 left-0 opacity-0 pointer-events-none -z-10 transition-all duration-100`,
        checkoutOpen.value && `z-50 opacity-100 pointer-events-auto`
      )}
    >
      {/* cart drawer */}
      <div
        className={cx(
          `w-full absolute top-0  h-screen translate-y-full overflow-auto bg-white transition-all`,
          checkoutOpen.value && `!translate-y-0`
        )}
      >
        <div className="p-4 pt-6 relative">
          <div className="flex justify-end items-center ">
            {/* close  */}
            <Button variant="icon" onClick={() => (checkoutOpen.value = false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400 w-6"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
          <div className="flex flex-col px-4">
            <div>
              <div class="mx-auto max-w-2xl md:px-4 pb-24 md:pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <form class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                  <AddressList />
                  {/* <!-- Order summary --> */}
                  <div class="mt-10 lg:mt-0">
                    <h2 class="text-lg font-medium text-gray-900">
                      Order summary
                    </h2>

                    <div class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                      <h3 class="sr-only">Items in your cart</h3>
                      <OrderSummary />

                      <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <button
                          type="submit"
                          class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                        >
                          Confirm order
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default index;
