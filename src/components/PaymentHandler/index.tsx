import type { Signal } from '@preact/signals';
import { PaymentElement, useElements } from '@stripe/react-stripe-js';
import Typography from '@components/Typography';
import type { FunctionComponent } from 'preact';
import type { Stripe } from '@stripe/stripe-js';

type TPaymentHandlerProps = {
  clientSecret: Signal<string | undefined>;
  stripe: Stripe | null;
  addressId: string | null;
}

const PaymentHandler: FunctionComponent<TPaymentHandlerProps> = ({ clientSecret, stripe }) => {
  const elements = useElements();
  return (
    <>
      <Typography size='h5/medium' className='mb-4'>Payment Details</Typography>
      {clientSecret.value ? (
        <PaymentElement />
      ) : null}
    </>
  )
}

export default PaymentHandler