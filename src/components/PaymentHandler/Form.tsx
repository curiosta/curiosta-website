import medusa from "@api/medusa"
import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import type { StripeCardElement } from "@stripe/stripe-js"

export default function Form({ clientSecret, cartId }: { clientSecret: string, cartId: string }) {
  const stripe = useStripe()
  const elements = useElements()

  async function handlePayment(e: MouseEvent) {
    e.preventDefault()
    if (!stripe || !elements) return;

    const element = elements.getElement(CardElement);
    if (!element) return;

    stripe?.confirmCardPayment(clientSecret, {
      payment_method: {
        card: (element as unknown as StripeCardElement) /** StripeCardElement is correct type for this element. */,
      },
    }).then(({ error, paymentIntent }) => {
      // TODO handle errors
      medusa.carts.complete(cartId).then(
        (resp) => {
          console.log('Response:\n', JSON.stringify(resp, undefined, 4));
        }
      );
      console.log(error, paymentIntent);

    })
  }

  return (
    <form className='w-11/12 mx-auto'>
      <CardElement />
      <button onClick={handlePayment}>Submit</button>
    </form>
  )
};