import medusa from "@api/medusa"
import user from "@api/user"
import {
  useElements,
  PaymentElement,
  useStripe,
} from "@stripe/react-stripe-js"
import type { StripeCardElement } from "@stripe/stripe-js"

export default function Form({ clientSecret, cartId }: { clientSecret: string, cartId: string }) {
  const stripe = useStripe()
  const elements = useElements();
  const currentCustomer = user.customer.value;

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    const element = elements.getElement(PaymentElement);
    if (!element) return;
    elements.submit()

    const selectedAddress = currentCustomer?.billing_address_id && currentCustomer.shipping_addresses.find((address) => address.id === currentCustomer.billing_address_id);

    if (!selectedAddress) {
      throw new Error('User does not have any address selected!');
    }
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/completion`
      },
    })
    // stripe?.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     card: (element as unknown as StripeCardElement) /** StripeCardElement is correct type for this element. */,
    //     billing_details: {
    //       address: {
    //         line1: selectedAddress.address_1 || '',
    //         city: selectedAddress.city || '',
    //         postal_code: selectedAddress.postal_code || '',
    //         country: selectedAddress.country_code || '',
    //       },
    //       email: currentCustomer.email,
    //       name: `${currentCustomer.first_name || ''} ${currentCustomer.last_name || ''}`.trim(),
    //       phone: currentCustomer.phone
    //     }
    //   },
    // }).then(({ error, paymentIntent }) => {
    //   if (paymentIntent?.status === 'requires_action' || paymentIntent?.status === 'succeeded') {
    //     medusa.carts.complete(cartId).then(
    //       (resp) => {
    //         console.log('Response:\n', JSON.stringify(resp, undefined, 4));
    //       }
    //     );
    //   } else {
    //     console.log('FAILED!!!!!!!!!!!!:', error, paymentIntent);
    //   }
    // })
  }

  return (
    <form className='w-11/12 mx-auto' onSubmit={(e) => { e.preventDefault(); handlePayment() }}>
      <PaymentElement />
      <button>Submit</button>
    </form>
  )
};