import { useSignal } from '@preact/signals';
import { Elements } from '@stripe/react-stripe-js';
import Form from './Form';
import { useEffect } from 'preact/hooks';
import PaymentWorkflow from '@utils/stripe';
import { cart } from '@store/cartStore';
import medusa from '@api/medusa';

const paymentHandler = new PaymentWorkflow(cart.value?.id || '')

const PaymentHandler = () => {
  const clientSecret = useSignal<string | undefined>(undefined);

  useEffect(() => {
    if (!cart.value) return;
    medusa.carts.createPaymentSessions(cart.value.id).then(({ cart: sessionCart }) => {
      const isStripeAvailable = sessionCart.payment_sessions?.some((s) => s.provider_id === 'stripe');
      if (!isStripeAvailable) throw new Error('Stripe is not supported in this region, Please contact administrator & ask to add stripe in backend!.');

      if (!cart.value) return;
      medusa.carts.setPaymentSession(cart.value.id, { provider_id: 'stripe' }).then(({ cart: paymentSessionCart }) => {
        console.log(paymentSessionCart);
        const _clientSecret = paymentSessionCart.payment_session?.data.client_secret as string
        if (_clientSecret) { clientSecret.value = _clientSecret }
      })
    });

  }, [cart.value])

  return (
    <>
      {clientSecret.value ? (
        <Elements stripe={paymentHandler.stripeInstance} options={{ clientSecret: clientSecret.value }}>
          <Form clientSecret={clientSecret.value} cartId={cart.value?.id || ''} />
        </Elements>
      ) : null}
    </>
  )
}

export default PaymentHandler