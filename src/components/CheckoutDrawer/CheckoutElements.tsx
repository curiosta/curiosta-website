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
import priceToCurrency from "@utils/priceToCurrency";

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
  const errorState = useSignal<string | undefined>(undefined);
  const manualPayment = useSignal<boolean>(false);

  const handlePayment = async () => {
    if (errorState.value) {
      errorState.value = undefined;
    }
    processingPayment.value = true;

    if (cart.store.value?.region.name === "IN") {
      manualPayment.value = true;
      // cart.completeCart(cart.store.value.id);
      // window.location.href = `${window.location.origin}/orders/confirm?cart=${cart.store.value.id}`;
    } else {
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
        if (error) throw error;
      } catch (error: any) {
        errorState.value = error?.message || "Unknown error occurred!";
      }
    }
    processingPayment.value = false;
  };

  const disableCheckoutButton = () => {
    let hasAnyError = false;
    if (!selectedAddressId.value) hasAnyError = true;
    if (!cart.store.value?.items.length) hasAnyError = true;
    if (!cart.store.value?.payment_session) hasAnyError = true;
    if (cart.store.value?.region.name !== "IN") {
      if (!clientSecret.value) hasAnyError = true;
    }
    if (!cart.shipping.selectedOption.value) hasAnyError = true;

    if (
      !cart.store.value?.shipping_address_id ||
      !cart.store.value.billing_address_id
    )
      hasAnyError = true;
    if (cart.loading.value) hasAnyError = true; // if there is any query running in cart.
    return hasAnyError;
  };

  return (
    <div className="flex flex-col px-4 h-full">
      <div class="h-full">
        {!manualPayment.value ? (
          cart.store.value?.items.length ? (
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
                  <h2 class="text-lg font-medium text-gray-900">
                    Order summary
                  </h2>

                  <div class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                    <h3 class="sr-only">Items in your cart</h3>
                    <OrderSummary />

                    <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <Button type="submit" disabled={disableCheckoutButton()}>
                        Confirm order
                      </Button>
                      {errorState.value ? (
                        <Typography
                          variant="error"
                          className="text-center mt-1"
                        >
                          {errorState}
                        </Typography>
                      ) : null}
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
                className="w-32  fill-none stroke-gray-300"
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
          )
        ) : (
          <div
            className={`flex
             flex-col justify-center items-center h-full w-full`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-32 h-32"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
              />
            </svg>

            <Typography size="h6/semi-bold">
              {cart.store.value?.total
                ? priceToCurrency(cart.store.value.total)
                : "N/A"}
            </Typography>
            <Typography
              size="h5/semi-bold"
              className="text-gray-400 sm:text-3xl"
            >
              Scan and Pay
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutElements;
