import cart from '@api/cart';
import Typography from '@components/Typography';
import type { FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';

type TCleanupProps = {
  params: {
    cart: string | null;
    status: string | null;
    paymentIntentId: string | null;
  }
}

const CartReset: FunctionComponent<TCleanupProps> = ({ params }) => {

  const refreshCart = async () => {
    if (params.cart && params.status === 'succeeded' && params.paymentIntentId?.length) {
      try {
        await cart.resetCartId();
        window.location.replace('/orders/success')
      } catch (error) {
        await cart.resetCartId();
        window.location.replace('/orders/failed')
      }
    } else if (params.status !== 'succeeded') {
      window.location.replace('/orders/failed')
    }
  }

  useEffect(() => {
    refreshCart()
  }, [])
  return (
    <div className='pt-64 flex justify-center items-center flex-col'>
      <Typography size='h4/normal' className='animate-pulse'>Please wait, confirming your order...</Typography>
      <Typography className='mt-4' variant='secondary'>Do not close your browser</Typography>
    </div>
  );
}

export default CartReset