import Typography from "@components/Typography";
import type { Order } from "@medusajs/medusa";
import priceToCurrency from "@utils/priceToCurrency";
import type { FunctionComponent } from "preact";

type TOrderProps = {
  order: Order;
};

const OrdersInfo: FunctionComponent<TOrderProps> = ({ order }) => {
  console.log(order);
  return (
    <div class="space-y-8">
      {order.items.map((item) => (
        <div class="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
          <div class="px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
            <div class="sm:flex lg:col-span-7">
              <div class="aspect-h-1 aspect-w-1 w-full flex-shrink-0 overflow-hidden rounded-lg sm:aspect-none sm:h-40 sm:w-40">
                <img
                  src={item.thumbnail ?? undefined}
                  alt={item.title}
                  class="h-full w-full object-cover object-center sm:h-full sm:w-full"
                />
              </div>

              <div class="mt-6 sm:ml-6 sm:mt-0">
                <Typography tag="h3" size="body1/medium">
                  <a href={`/products/${item.variant.product_id}`}>
                    {item.title}
                  </a>
                </Typography>
                <Typography size="body2/medium" className="mt-2 ">
                  {priceToCurrency(item.unit_price)}
                </Typography>
                <Typography size="body2/normal" className="mt-3 text-gray-500">
                  {item.description}
                </Typography>
                <Typography size="body2/normal" className="mt-3 text-gray-500">
                  Qty: {item.quantity}
                </Typography>
              </div>
            </div>

            <div class="mt-6 lg:col-span-5 lg:mt-0">
              <dl class="grid grid-cols-2 gap-x-6 text-sm">
                <div>
                  <dt class="font-medium text-gray-900">Shipping address</dt>
                  <dd class="mt-3 text-gray-500">
                    <Typography
                      size="body2/normal"
                      className="block"
                    >{`${order.shipping_address?.first_name} ${order.shipping_address?.last_name}`}</Typography>
                    <Typography size="body2/normal" className="block">
                      {`${order.shipping_address?.address_1}, ${order.shipping_address?.city}, ${order.shipping_address?.postal_code}`}
                    </Typography>
                    <Typography size="body2/normal" className="block">
                      {`Phone: ${order.shipping_address?.phone} `}
                    </Typography>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div class="border-t border-gray-200 px-4 py-6 sm:px-6 lg:p-8">
            <h4 class="sr-only">Status</h4>
            <p class="text-sm font-medium text-gray-900">
              Preparing to ship on <time dateTime="2021-03-24">{"Date"}</time>
            </p>
            <div class="mt-6" aria-hidden="true">
              <div class="overflow-hidden rounded-full bg-gray-200">
                <div
                  class="h-2 rounded-full bg-indigo-600"
                  style="width: calc((1 * 2 + 0) / 8 * 100%)"
                ></div>
              </div>
              <div class="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
                <div class="text-indigo-600">Order placed</div>
                <div class="text-center text-indigo-600">Processing</div>
                <div class="text-center">Shipped</div>
                <div class="text-right">Delivered</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersInfo;
