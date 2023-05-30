const parseOrderConfirmParams = (params: URLSearchParams) => {
  const cart = params.get('cart');
  const status = params.get('redirect_status');
  const paymentIntentId = params.get('payment_intent');
  return { cart, status, paymentIntentId }
}

export default parseOrderConfirmParams;