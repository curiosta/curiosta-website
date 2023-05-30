import medusa from "@api/medusa";
import AddressList from "@components/AddressList";
import Button from "@components/Button";
import OrderSummary from "@components/OrderSummary";
import PaymentHandler from "@components/PaymentHandler";
import useKeyboard from "@hooks/useKeyboard";
import { signal, useSignal } from "@preact/signals";
import { cart } from "@store/cartStore";
import { checkoutOpen } from "@store/checkoutStore";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { cx } from "class-variance-authority";
import { createPortal, useEffect } from "preact/compat";
import CheckoutElements from "./CheckoutElements";
import Typography from "@components/Typography";

const stripe = signal<Stripe | null>(null);

try {
  stripe.value = await loadStripe(import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY || '')
} catch (error) {
  console.log('Failed to load stripe:', error);
}

const CheckoutDrawer = () => {
  const { add } = useKeyboard('Escape', { event: 'keydown' });
  const selectedAddressId = useSignal<string | null>(null);
  const clientSecret = useSignal<string | undefined>(undefined);

  // remove app's default scroll if cart is open
  document.body.style.overflow = checkoutOpen.value ? "hidden" : "auto";

  add('close-checkout-drawer', () => {
    checkoutOpen.value = false;
  })

  useEffect(() => {
    if (!cart.value || !checkoutOpen.value) return;
    medusa.carts.createPaymentSessions(cart.value.id).then(({ cart: sessionCart }) => {
      const isStripeAvailable = sessionCart.payment_sessions?.some((s) => s.provider_id === 'stripe');
      if (!isStripeAvailable) throw new Error('Stripe is not supported in this region, Please contact administrator & ask to add stripe in backend!.');
      if (!cart.value) return;
      medusa.carts.setPaymentSession(cart.value.id, { provider_id: 'stripe' }).then(({ cart: paymentSessionCart }) => {
        const _clientSecret = paymentSessionCart.payment_session?.data.client_secret as string
        if (_clientSecret) { clientSecret.value = _clientSecret }
      })
    });
  }, [cart.value, checkoutOpen.value]);


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
        <div className="p-4 pt-6 relative h-full flex flex-col">
          <div className="flex justify-end items-center">
            {/* close  */}
            <Typography size="body2/normal" variant='secondary' className='select-none'>Press 'esc' to close</Typography>
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
          {clientSecret.value && stripe.value ? (
            <Elements stripe={stripe.value} options={{ clientSecret: clientSecret.value }}>
              <CheckoutElements clientSecret={clientSecret} selectedAddressId={selectedAddressId} stripe={stripe.value} />
            </Elements>
          ) : (
            <div className='flex justify-center items-center h-full'>
              <Typography size='h4/normal' className='animate-pulse duration-75'>Please wait...</Typography>
            </div>

          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CheckoutDrawer;
