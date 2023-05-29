import medusa from "@api/medusa";
import { loadStripe, Stripe } from "@stripe/stripe-js";

class PaymentWorkflow {
  stripeInstancePromise: Promise<Stripe | null> | null = null;
  cart: string;

  constructor(cart: string) {
    this.cart = cart;
    if (!import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe API Key was not found!");
    }
    this.stripeInstancePromise = loadStripe(
      import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY
    );
  }

  async handleCheckout() {
    const stripe = await this.stripeInstancePromise;
    if (!stripe) throw new Error('Stripe is not initialized!');

    const initializedSessionCart = await medusa.carts.createPaymentSessions(this.cart);
    const isStripeAvailableInCurrentRegion = initializedSessionCart.cart.payment_sessions.map(p => p.provider_id).includes('stripe');

    if (!isStripeAvailableInCurrentRegion) {
      throw new Error(`Stripe is not supported in current region. Please go to Medusa's dashboard and enable stripe for \`${initializedSessionCart.cart.region.name}\`.`);
    }

    const { cart } = await medusa.carts.setPaymentSession(this.cart, { provider_id: 'stripe' });

    const clientSecret = cart.payment_session?.data.client_secret as string | undefined;

    if (!clientSecret) throw new Error('An error occurred while creating new payment session.');
    return clientSecret;
  }
}

export default PaymentWorkflow