import user from "@api/user";
import OrderItem from "./OrderItem";
import Typography from "@components/Typography";
import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import type { Order } from "@medusajs/medusa";
import { ordersList } from "@api/user/ordersList";
import Pagination from "@components/Pagination";

const OrdersList = () => {
  const userState = user.state.value;
  const orders = useSignal<Order[]>([]);
  const isLoading = useSignal(false);
  const count = useSignal<null | number>(null);
  const limit = useSignal<number>(10);
  const offset = useSignal<number>(0);

  const getOrdersList = async () => {
    try {
      isLoading.value = true;
      const res = await ordersList({
        limit: limit.value,
        offset: offset.value,
      });
      count.value = res.count;
      orders.value = res.orders;
    } catch (error) {
    } finally {
      isLoading.value = false;
    }
  };

  useEffect(() => {
    getOrdersList();
  }, [offset.value]);

  return (
    <div class="mt-16">
      <Typography tag="h2" className="sr-only">
        Recent orders
      </Typography>
      <div class="mx-auto max-w-7xl sm:px-2 lg:px-8">
        {userState === "authenticated" ? (
          <div class="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
            {!isLoading.value ? (
              count.value ? (
                orders.value.map((order) => {
                  return <OrderItem order={order} />;
                })
              ) : (
                <div class="text-center my-20">
                  <Typography size="body1/semi-bold" className="my-2">
                    You didn't order anyitem yet
                  </Typography>
                  <Typography size="body1/normal" variant={"secondary"}>
                    Explore{" "}
                    <a
                      href="/products"
                      class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                      Products
                    </a>{" "}
                    and buy something
                  </Typography>
                </div>
              )
            ) : (
              <Typography tag="h5" size="h5/semi-bold">
                Loading...
              </Typography>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center my-20">
            <Typography
              size="body1/normal"
              variant={"secondary"}
              className="mt-8 text-center"
            >
              <a
                href="/login"
                class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 "
              >
                Login
              </a>{" "}
              to view your orders
            </Typography>
          </div>
        )}
      </div>
      <Pagination
        isLoading={isLoading}
        count={count}
        limit={limit}
        offset={offset}
      />
    </div>
  );
};

export default OrdersList;
