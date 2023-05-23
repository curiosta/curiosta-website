import { useSignal } from '@preact/signals';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Form from './Form';
import { useEffect } from 'preact/hooks';
import PaymentWorkflow from '@utils/stripe';
import { cart } from '@store/cartStore';

const paymentHandler = new PaymentWorkflow(cart.value.id)

const PaymentHandler = () => {
  const clientSecret = useSignal<string | undefined>(undefined);

  useEffect(() => {
    // medusa.carts.createPaymentSessions(cart.value.id).then(({ cart: sessionCart }) => {
    //   const isStripeAvailable = sessionCart.payment_sessions?.some((s) => s.provider_id === 'stripe');
    //   if (!isStripeAvailable) throw new Error('Stripe is not supported in this region, Please contact administrator & ask to add stripe in backend!.');

    //   console.log('setting session...')
    //   medusa.carts.setPaymentSession(cart.value.id, { provider_id: 'stripe' }).then(({ cart: paymentSessionCart }) => {
    //     console.log(paymentSessionCart);
    //     const _clientSecret = paymentSessionCart.payment_session?.data.client_secret as string
    //     if (_clientSecret) { clientSecret.value = _clientSecret }
    //   })
    // });

    (async () => {
      clientSecret.value = await paymentHandler.handleCheckout()
    })()

  }, [])

  return (
    <>

      <div id="card-element" className='w-1/2 mx-auto'>

      </div>
      {clientSecret.value ? (
        <Elements stripe={paymentHandler.stripeInstance} options={{ clientSecret: clientSecret.value }}>
          <Form clientSecret={clientSecret.value} cartId={cart.value.id} />
        </Elements>
      ) : null}
    </>
  )
}

export default PaymentHandler