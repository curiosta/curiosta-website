import user from "@api/user"
import OrderItem from "./OrderItem";

const OrdersList = () => {
  const customer = user.customer.value;
  return (
    <div>
      {customer?.orders.map((order) => {
        return <OrderItem order={order} />
      })}
    </div>
  )
}

export default OrdersList