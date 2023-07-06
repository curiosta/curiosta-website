import user from "@api/user";
import OrderItem from "./OrderItem";
import Typography from "@components/Typography";
import { useEffect, useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import type { Order } from "@medusajs/medusa";
import { ordersList } from "@api/user/ordersList";

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
          <div class="mx-auto max-w-2xl space-y-8 px-0 lg:max-w-4xl">
            {!isLoading.value ? (
              count.value ? (
                orders.value.map((order) => {
                  return <OrderItem order={order} />;
                })
              ) : (
                <div class="text-center my-20">
                  <Typography size="body1/semi-bold" className="my-2">
                    You didn't order any item yet
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
              <Typography
                size="h6/semi-bold"
                variant="secondary"
                className="animate-pulse"
              >
                Loading...
              </Typography>
            )}
          </div>
        ) : userState === "unauthenticated" ? (
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
        ) : (
          <Typography
            size="h6/semi-bold"
            variant="secondary"
            className="animate-pulse"
          >
            Loading...
          </Typography>
        )}
      </div>
    </div>
  );
};

export default OrdersList;
