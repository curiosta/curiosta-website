import { cart } from "@store/cartStore";
import priceToCurrency from "@utils/priceToCurrency";
import CartItem from "@components/CartItem";

const OrderSummary = () => {
  return (
    <div>
      <ul role="list" class="divide-y divide-gray-200 p-4">
        {cart.value?.items?.map((item) => (
          <div className="py-4 border-b last:border-b-0">
            <CartItem item={item} />
          </div>
        ))}

        {/* <!-- More products... --> */}
      </ul>
      <dl class="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
        <div class="flex items-center justify-between">
          <dt class="text-sm">Subtotal</dt>
          <dd class="text-sm font-medium text-gray-900">
            {cart.value?.subtotal ? priceToCurrency(cart.value.subtotal) : "N/A"}
          </dd>
        </div>
        <div class="flex items-center justify-between">
          <dt class="text-sm">Shipping</dt>
          <dd class="text-sm font-medium text-gray-900">
            {cart.value?.shipping_total
              ? priceToCurrency(cart.value.shipping_total)
              : "N/A"}
          </dd>
        </div>
        <div class="flex items-center justify-between">
          <dt class="text-sm">Taxes</dt>
          <dd class="text-sm font-medium text-gray-900">
            {cart.value?.tax_total
              ? priceToCurrency(cart.value.tax_total)
              : "N/A"}
          </dd>
        </div>
        <div class="flex items-center justify-between border-t border-gray-200 pt-6">
          <dt class="text-base font-medium">Total</dt>
          <dd class="text-base font-medium text-gray-900">
            {cart.value?.total ? priceToCurrency(cart.value.total) : "N/A"}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default OrderSummary;
