import Button from "@components/Button";
import Typography from "@components/Typography";
import type { Order } from "@medusajs/medusa";
import { useSignal } from "@preact/signals";
import priceToCurrency from "@utils/priceToCurrency";
import { cx } from "class-variance-authority";
import type { FunctionComponent } from "preact";

type TOrderItemProps = {
  order: Order;
};
const OrderItem: FunctionComponent<TOrderItemProps> = ({ order }) => {
  const isThreeDots = useSignal<boolean>(false);

  return (
    <div class="border-b border-t border-gray-200 bg-white shadow-sm rounded-lg border">
      <div class="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
        <dl class="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
          <div>
            <dt class="font-medium text-gray-900">Order number</dt>
            <dd class="mt-1 text-gray-500 break-words">{order.id}</dd>
          </div>
          <div class="hidden sm:block">
            <dt class="font-medium text-gray-900">Date placed</dt>
            <dd class="mt-1 text-gray-500">
              <time dateTime="2021-07-06">
                {new Date(order.created_at).toLocaleDateString("default", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </dd>
          </div>
          {/* <div>
            <dt class="font-medium text-gray-900">Total amount</dt>
            <dd class="mt-1 font-medium text-gray-900">{order.total}</dd>
          </div> */}
        </dl>

        <div class="relative flex justify-end lg:hidden">
          <div class="flex items-center">
            <Button
              type="button"
              variant={"icon"}
              className="-m-2 !w-fit !border-none"
              onClick={() => (isThreeDots.value = !isThreeDots.value)}
              id="menu-0-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <Typography className="sr-only">
                Options for order {order.id}
              </Typography>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                />
              </svg>
            </Button>
          </div>

          <div
            class={cx(
              "absolute top-8 right-0 z-10  w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
              isThreeDots.value ? "block" : "hidden"
            )}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-0-button"
          >
            <div class="py-1" role="none">
              <a
                href={`/orders/${order.id}`}
                class="text-gray-700 block px-4 py-2 text-sm "
                role="menuitem"
                id="menu-0-item-0"
              >
                View order
              </a>
            </div>
          </div>
        </div>

        <div class="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
          <Button
            link={`/orders/${order.id}`}
            variant={"secondary"}
            className={"!w-fit"}
          >
            <span>View Order</span>
            <span class="sr-only">{order.id}</span>
          </Button>
        </div>
      </div>

      {/* <!-- Products --> */}
      <Typography tag="h4" className="sr-only">
        Items
      </Typography>
      <ul role="list" class="divide-y divide-gray-200">
        {order.items.map((item) => (
          <li class="p-4 sm:p-6">
            <div class="flex items-center sm:items-start">
              <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                <img
                  src={item.thumbnail ?? undefined}
                  alt={item.title}
                  class="h-full w-full object-cover object-center"
                />
              </div>
              <div class="ml-6 flex-1 text-sm">
                <div class="font-medium text-gray-900 sm:flex sm:justify-between">
                  <Typography tag="h5" size="h5/semi-bold">
                    {item.title}
                  </Typography>
                  <Typography className="mt-2 sm:mt-0">
                    {priceToCurrency(item.unit_price, order.currency_code)}
                  </Typography>
                </div>
                <Typography
                  variant={"secondary"}
                  className="hidden sm:mt-2 sm:block"
                >
                  {item.description}
                </Typography>
                <Typography
                  variant="secondary"
                  className="hidden sm:mt-2 sm:block"
                >
                  Qty: {item.quantity}
                </Typography>
              </div>
            </div>

            <div class="mt-6 sm:flex sm:justify-between">
              <div class="flex items-center">
                <Typography
                  size="body1/normal"
                  variant="secondary"
                  className="ml-2 "
                >
                  Status: {order.status}
                </Typography>
              </div>
              <div class="flex items-center">
                <Typography
                  size="body1/normal"
                  variant="secondary"
                  className="ml-2 "
                >
                  Payment Status:{" "}
                  {order.payment_status === "captured"
                    ? "paid"
                    : order.payment_status}
                </Typography>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderItem;
