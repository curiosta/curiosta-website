import Button from "@components/Button";
import { CurrencyMap, currencyMap } from "@components/CurrencyMap";
import Typography from "@components/Typography";
import { cart } from "@store/cartStore";
import { useEffect } from "preact/hooks";

const OrderSummary = () => {
  const currency = cart.value.region?.currency_code as keyof CurrencyMap;

  const handleRedirect = () => {
    if (cart.value.shipping_address_id) {
      location.href = "/checkout";
    } else {
      location.href = "/newAddress";
    }
  };

  useEffect(() => {

  }, []);


  return (
    <section
      aria-labelledby="summary-heading"
      class={`mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 ${!cart.value.items?.length ? "hidden" : ""
        }`}
    >
      <Typography
        tag="h6"
        size="h6/medium"
        variant="primary"
        id="summary-heading"
      >
        Order summary
      </Typography>

      <dl class="mt-6 space-y-4">
        <div class="flex items-center justify-between">
          <dt class="text-sm text-gray-600">Subtotal</dt>
          <dd class="text-sm font-medium text-gray-900">
            {currencyMap[currency]}
            {((cart.value.subtotal || 0) / 100).toFixed(2)}
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
            {currencyMap[currency]}
            {((cart.value.shipping_total || 0) / 100).toFixed(2)}
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
            {currencyMap[currency]}
            {((cart.value.tax_total || 0) / 100).toFixed(2)}
          </dd>
        </div>
        <div class="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt class="text-base font-medium text-gray-900">Order total</dt>
          <dd class="text-base font-medium text-gray-900">
            {currencyMap[currency]}
            {((cart.value.total || 0) / 100).toFixed(2)}
          </dd>
        </div>
      </dl>

      <div class="mt-6">
        <Button
          type="button"
          title={"checkout"}
          variant={"primary"}
          onClick={handleRedirect}
        >
          Checkout
        </Button>
      </div>
    </section>
  );
};

export default OrderSummary;
