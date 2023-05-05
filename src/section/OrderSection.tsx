import { cart } from "@store/cartStore";

const OrderSection = () => {
  return (
    <section
      aria-labelledby="summary-heading"
      class={`mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 ${
        !cart.value.items?.length ? "hidden" : ""
      }`}
    >
      <h2 id="summary-heading" class="text-lg font-medium text-gray-900">
        Order summary
      </h2>

      <dl class="mt-6 space-y-4">
        <div class="flex items-center justify-between">
          <dt class="text-sm text-gray-600">Subtotal</dt>
          <dd class="text-sm font-medium text-gray-900">
            ${cart.value.subtotal}
          </dd>
        </div>
        <div class="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt class="flex items-center text-sm text-gray-600">
            <span>Shipping estimate</span>
            <a
              href="#"
              class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
            >
              <span class="sr-only">
                Learn more about how shipping is calculated
              </span>
              <svg
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </dt>
          <dd class="text-sm font-medium text-gray-900">
            ${cart.value.shipping_total}
          </dd>
        </div>
        <div class="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt class="flex text-sm text-gray-600">
            <span>Tax estimate</span>
            <a
              href="#"
              class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
            >
              <span class="sr-only">
                Learn more about how tax is calculated
              </span>
              <svg
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </dt>
          <dd class="text-sm font-medium text-gray-900">
            ${cart.value.tax_total}
          </dd>
        </div>
        <div class="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt class="text-base font-medium text-gray-900">Order total</dt>
          <dd class="text-base font-medium text-gray-900">
            ${cart.value.total}
          </dd>
        </div>
      </dl>

      <div class="mt-6">
        <button
          type="submit"
          class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
        >
          Checkout
        </button>
      </div>
    </section>
  );
};

export default OrderSection;
