import type { Signal } from '@preact/signals';
import { Elements } from '@stripe/react-stripe-js';
import Form from './Form';
import { cart } from '@store/cartStore';
import Typography from '@components/Typography';
import type { FunctionComponent } from 'preact';
import type { Stripe } from '@stripe/stripe-js';

type TPaymentHandlerProps = {
  clientSecret: Signal<string | undefined>;
  stripe: Stripe | null;
  addressId: string | null;
}

const PaymentHandler: FunctionComponent<TPaymentHandlerProps> = ({ clientSecret, stripe }) => {
  return (
    <>
      <Typography size='h5/medium'>Payment Details</Typography>
      {clientSecret.value ? (
        <Elements stripe={stripe} options={{ clientSecret: clientSecret.value }}>
          <Form clientSecret={clientSecret.value} cartId={cart.value?.id || ''} />
        </Elements>
      ) : null}
    </>
  )
}

export default PaymentHandler