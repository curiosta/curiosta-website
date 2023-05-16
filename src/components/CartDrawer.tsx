import { CartItem, cart, cartOpen } from "@store/cartStore";
import { createPortal } from "preact/compat"
import { cx } from "class-variance-authority";
import Button from "./Button";
import Typography from "./Typography";

const CartItem = ({ item }: { item: CartItem }) => {
  return (
    <div className='flex h-20'>
      <img src={item.thumbnail} className='w-20 h-20 object-cover border' loading='lazy' alt="" />
      <div className='flex flex-col justify-between pl-4 w-full'>
        <div className='w-full flex justify-between'>
          <div>
            <Typography size='body1/medium'>{item.title}</Typography>
            <Typography size='body2/normal' variant='secondary'>{item.description}</Typography>
          </div>

          <Typography size='body1/medium'>{item.quantity * item.unit_price}</Typography>
        </div>
        <Typography size='body2/normal' variant='secondary'>Qty {item.quantity}</Typography>
      </div>
    </div>
  )

}


const CartDrawer = () => {

  // remove app's default scroll if cart is open
  document.body.style.overflow = cartOpen.value ? 'hidden' : 'auto'
  console.log(cartOpen.value);
  return createPortal(
    <div className={cx(`fixed w-full flex h-screen top-0 left-0 opacity-0 pointer-events-none -z-10 transition-all duration-100`, cartOpen.value && `z-50 opacity-100 pointer-events-auto`)}>
      {/* overlay */}
      <div className="hidden sm:block w-full bg-primary-100/30" onClick={() => cartOpen.value = false} />

      {/* cart drawer */}
      <div className={cx(`w-full absolute top-0 right-0 h-screen translate-x-full sm:max-w-sm overflow-auto bg-white transition-all`, cartOpen.value && `!translate-x-0`)}>
        <div className='p-4 pt-6 relative'>
          <div className='flex justify-between items-center border-b p-2'>
            <Typography size="h6/bold">Shopping Cart</Typography>
            {/* close cart */}
            <Button variant='icon' onClick={() => cartOpen.value = false}>
              <svg xmlns="http://www.w3.org/2000/svg" className='text-gray-400 w-6' viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
          <div className='flex flex-col'>
            {/* cart items */}
            {cart.value.items.map((item) => (
              <div className='py-4 border-b last:border-b-0'>
                <CartItem item={item} />
              </div>
            ))}
          </div>
          <div className='sticky bg-white border-t bottom-0 left-0 w-full h-40 p-4 flex flex-col justify-between'>
            {/* checkout billing and details */}
            <div>
              <div className='flex justify-between'>
                <Typography size="body1/bold">Subtotal</Typography>
                <Typography size="body1/bold">{cart.value.subtotal}</Typography>
              </div>
              <Typography size='small/normal' variant='secondary'>Shipping and taxes are calculated at checkout.</Typography>
            </div>
            <Button variant='primary'>
              Checkout
            </Button>
            <div className='flex gap-1 justify-center'>
              <Typography size="body2/normal">or</Typography>
              <Typography variant='app-primary' size="body2/bold" className='cursor-pointer' onClick={() => cartOpen.value = false}>Continue Shopping</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default CartDrawer