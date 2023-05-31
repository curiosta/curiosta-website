import user from "@api/user";
import OrderItem from "./OrderItem";
import Typography from "@components/Typography";

const OrdersList = () => {
  const customer = user.customer.value;
  return (
    <div class="mt-16">
      <Typography tag="h2" className="sr-only">
        Recent orders
      </Typography>
      <div class="mx-auto max-w-7xl sm:px-2 lg:px-8">
        <div class="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
          {customer?.orders.map((order) => {
            return <OrderItem order={order} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
