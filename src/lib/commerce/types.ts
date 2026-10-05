/** Minimal shapes the storefront will need from Medusa 1.16 (store API). */
export interface CartLineInput { variantId: string; quantity: number }
export interface MinimalCart {
  id: string;
  region_id: string;
  items: { id: string; title: string; quantity: number; unit_price: number; variant_id: string }[];
  subtotal: number; // paise
  tax_total: number; // paise
  shipping_total: number; // paise
  total: number; // paise
}
export interface StoreClient {
  getOrCreateCart(): Promise<MinimalCart>;
  addLine(input: CartLineInput): Promise<MinimalCart>;
  /** Creates a Razorpay order via the razorpay payment session; returns data for Checkout.js. */
  startRazorpayPayment(cartId: string): Promise<{ orderId: string; keyId: string; amount: number }>;
  /** POST /store/razorpay/verify with razorpay_order_id|payment_id|signature, then completes the cart. */
  verifyAndComplete(cartId: string, payload: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }): Promise<{ orderId: string }>;
}
