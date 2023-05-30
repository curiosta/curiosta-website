import useLocalStorage from '@hooks/useLocalStorage';
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
  const { remove } = useLocalStorage();

  const refreshCart = async () => {
    console.log(params);
    if (params.status === 'succeeded' && params.paymentIntentId?.length) {
      resetCart()
    }
  }

  useEffect(() => {
    refreshCart()
  }, [])
  return null;
}

export default CartReset