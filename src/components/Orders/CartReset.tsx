import medusa from '@api/medusa';
import Typography from '@components/Typography';
import { resetCart } from '@store/cartStore';
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
      await medusa.carts.complete(params.cart);
      resetCart();
      window.location.href = '/orders/success'
    }
  }

  useEffect(() => {
    refreshCart()
  }, [])
  return (
    <div className='h-full flex justify-center items-center'>
      <Typography>Please wait, confirming your order...</Typography>
    </div>
  );
}

export default CartReset