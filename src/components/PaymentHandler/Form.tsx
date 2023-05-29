import medusa from "@api/medusa"
import user from "@api/user"
import type { EventHandler } from "@medusajs/types"
import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import type { StripeCardElement } from "@stripe/stripe-js"

export default function Form({ clientSecret, cartId, }: { clientSecret: string, cartId: string }) {
  const stripe = useStripe()
  const elements = useElements();
  const currentCustomer = user.customer.value;

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    const element = elements.getElement(CardElement);
    if (!element) return;

    const selectedAddress = currentCustomer?.billing_address
    console.log(selectedAddress);


    // stripe?.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     card: (element as unknown as StripeCardElement) /** StripeCardElement is correct type for this element. */,
    //     billing_details: {
    //     }
    //   },
    // }).then(({ error, paymentIntent }) => {


    //   // medusa.carts.complete(cartId).then(
    //   //   (resp) => {
    //   //     console.log('Response:\n', JSON.stringify(resp, undefined, 4));
    //   //   }
    //   // );
    //   // console.log(error, paymentIntent);

    // })
  }

  return (
    <form className='w-11/12 mx-auto' onSubmit={(e) => { e.preventDefault(); handlePayment() }}>
      <CardElement />
      <button>Submit</button>
    </form>
  )
};