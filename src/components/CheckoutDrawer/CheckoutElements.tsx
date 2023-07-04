import user from "@api/user";
import AddressList from "@components/CheckoutDrawer/AddressList";
import Button from "@components/Button";
import OrderSummary from "@components/OrderSummary";
import PaymentHandler from "@components/PaymentHandler";
import { Signal, useSignal } from "@preact/signals";
import cart from "@api/cart";
import { PaymentElement, useElements } from "@stripe/react-stripe-js";
import type { Stripe } from "@stripe/stripe-js";
import type { FunctionComponent } from "preact";
import ShipmentSelect from "./ShipmentSelect";
import Typography from "@components/Typography";

type TCheckoutElementsProps = {
  selectedAddressId: Signal<string | null>;
  clientSecret: Signal<string | undefined>;
  stripe: Stripe | null;
};

const CheckoutElements: FunctionComponent<TCheckoutElementsProps> = ({
  selectedAddressId,
  clientSecret,
  stripe,
}) => {
  const elements = useElements();
  const currentCustomer = user.customer.value;
  const processingPayment = useSignal<boolean>(false);

  const handlePayment = async () => {
    processingPayment.value = true;
    const stripeInstance = await stripe;

    if (
      !stripeInstance ||
      !elements ||
      !clientSecret.value ||
      !cart.store.value
    )
      return;

    const element = elements.getElement(PaymentElement);
    if (!element) {
      processingPayment.value = false;
      return;
    }
    elements.submit();

    const selectedAddress =
      currentCustomer?.billing_address_id &&
      currentCustomer.shipping_addresses.find(
        (address) => address.id === currentCustomer.billing_address_id
      );

    if (!selectedAddress) {
      processingPayment.value = false;
      throw new Error("User does not have any address selected!");
    }

    try {
      const userDetails = {
        address: {
          line1: selectedAddress.address_1 || "",
          line2: selectedAddress.address_2 || "",
          city: selectedAddress.city || "",
          country: selectedAddress.country_code || "",
          postal_code: selectedAddress.postal_code || "",
          state: selectedAddress.province || "",
        },
        name: `${selectedAddress?.first_name || ""} ${
          selectedAddress?.last_name || ""
        }`.trim(),
      };

      const { error } = await stripeInstance.confirmPayment({
        elements,
        clientSecret: clientSecret.value,
        confirmParams: {
          return_url: `${window.location.origin}/orders/confirm?cart=${cart.store.value.id}`,
          save_payment_method: true,
          payment_method_data: {
            billing_details: {
              ...userDetails,
              email: selectedAddress.customer?.email,
            },
          },
          receipt_email: user.customer.value?.email,
          shipping: userDetails,
        },
      });
    } catch (error) {}
    processingPayment.value = false;
  };

  return (
    <div className="flex flex-col px-4 h-full">
      <div class="h-full">
        {cart.store.value?.items.length ? (
          <div class="mx-auto max-w-2xl md:px-4 pb-24 md:pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
            <form
              class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
              onSubmit={(e) => {
                e.preventDefault();
                handlePayment();
              }}
            >
              <div>
                <AddressList selectedAddressId={selectedAddressId} />
                {selectedAddressId.value && clientSecret.value ? (
                  <PaymentHandler />
                ) : null}
                <ShipmentSelect />
              </div>
              {/* <!-- Order summary --> */}
              <div class="mt-10 lg:mt-0">
                <h2 class="text-lg font-medium text-gray-900">Order summary</h2>

                <div class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                  <h3 class="sr-only">Items in your cart</h3>
                  <OrderSummary />

                  <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <Button
                      type="submit"
                      disabled={
                        !!(cart.loading.value || processingPayment.value)
                      }
                    >
                      Confirm order
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-full w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-32 sm:40 fill-none stroke-gray-300"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <Typography
              size="h5/semi-bold"
              className="text-gray-400 sm:text-3xl"
            >
              No items in cart!
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutElements;
