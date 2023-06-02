import Button from "@components/Button"
import Typography from "@components/Typography"
import cart from "@api/cart"

const EmptyCart = () => {
  return (
    <div className='w-full h-full flex justify-center items-center px-8'>
      <div className='flex flex-col items-center w-full'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className='w-32 fill-none stroke-gray-300'>
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        <Typography size="h5/medium" className='text-gray-400'>No items in cart!</Typography>
        <Button variant='primary' className='mt-8 w-full' onClick={() => cart.open.value = false}>Start Shopping</Button>
      </div>
    </div>
  )
}

export default EmptyCart