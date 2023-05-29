import type { Order } from "@medusajs/medusa"
import type { FunctionComponent } from "preact"

type TOrderItemProps = {
  order: Order
}
const OrderItem: FunctionComponent<TOrderItemProps> = ({ order }) => {
  return (
    <div>{ }</div>
  )
}

export default OrderItem