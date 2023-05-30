import { PaymentElement } from '@stripe/react-stripe-js';
import Typography from '@components/Typography';


const PaymentHandler = () => {
  return (
    <>
      <Typography size='h5/medium' className='mb-4'>Payment Details</Typography>
      <PaymentElement />
    </>
  )
}

export default PaymentHandler