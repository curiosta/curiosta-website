import medusa from "@api/medusa"
import user from "@api/user"
import AddressList from "@components/AddressList"
import OrderSummary from "@components/OrderSummary"
import PaymentHandler from "@components/PaymentHandler"
import type { Signal } from "@preact/signals"
import { cart } from "@store/cartStore"
import { PaymentElement, useElements, } from "@stripe/react-stripe-js"
import type { Stripe } from "@stripe/stripe-js"
import type { FunctionComponent } from "preact"

type TCheckoutElementsProps = {
  selectedAddressId: Signal<string | null>;
  clientSecret: Signal<string | undefined>;
  stripe: Stripe | null;
}

const CheckoutElements: FunctionComponent<TCheckoutElementsProps> = ({ selectedAddressId, clientSecret, stripe }) => {
  const elements = useElements();
  const currentCustomer = user.customer.value;

  const handlePayment = async () => {
    if (!stripe || !elements || !clientSecret.value || !cart.value) return;

    const element = elements.getElement(PaymentElement);
    if (!element) return;
    elements.submit();

    const selectedAddress = currentCustomer?.billing_address_id && currentCustomer.shipping_addresses.find((address) => address.id === currentCustomer.billing_address_id);

    if (!selectedAddress) {
      throw new Error('User does not have any address selected!');
    }

    try {
      await medusa.carts.complete(cart.value.id);
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: clientSecret.value,
        confirmParams: {
          return_url: `${window.location.origin}/orders/confirm?cart=${cart.value.id}`
        },
      });
    } catch (error) {
    }
  }

  return (
    <div className="flex flex-col px-4">
      <div>
        <div class="mx-auto max-w-2xl md:px-4 pb-24 md:pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <form class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16" onSubmit={(e) => {
            e.preventDefault();
            handlePayment()
          }}>
            <div>
              <AddressList selectedAddressId={selectedAddressId} />
              {selectedAddressId.value && clientSecret.value ? <PaymentHandler clientSecret={clientSecret} stripe={stripe} addressId={selectedAddressId.value} /> : null}
            </div>
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
  )
}

export default CheckoutElements