import type { LineItem } from "@medusajs/medusa";
import { useSignal } from "@preact/signals";
import {
  cart,
  decreaseCartItem,
  increaseCartItem,
  removeCartItem,
} from "@store/cartStore";
import { cx } from "class-variance-authority";
import Typography from "./Typography";
import priceToCurrency from "@utils/priceToCurrency";
import Button from "@components/Button";
import { checkoutOpen } from "@store/checkoutStore";
import user from "@api/user";

const CartItem = ({ item }: { item: LineItem }) => {
  const loadingQty = useSignal<boolean>(false);
  const loadingRemove = useSignal<boolean>(false);
  const increaseQty = async () => {
    loadingQty.value = true;
    try {
      if (!cart.value) return;
      await increaseCartItem(cart.value.id, item.id, item.quantity);
    } catch {
      // handle error
    } finally {
      loadingQty.value = false;
    }
  };
  const decreaseQty = async () => {
    loadingQty.value = true;
    try {
      if (!cart.value) return;
      await decreaseCartItem(cart.value.id, item.id, item.quantity);
    } catch {
      // handle error
    } finally {
      loadingQty.value = false;
    }
  };
  const removeProductFromCart = async () => {
    try {
      loadingRemove.value = true;
      if (!cart.value) return;
      await removeCartItem(cart.value.id, item.id);
      if (!cart.value.items.length) {
        // remove cart id to customer meta data
        await user.updateUser({ metadata: { cartId: null } });
        checkoutOpen.value = false;
      }
    } catch (error) {
      // handle error
    } finally {
      loadingRemove.value = false;
    }
  };

  return (
    <div className={cx("flex h-20", loadingRemove.value && "grayscale")}>
      {item.thumbnail ? (
        <img
          src={item.thumbnail}
          className="w-20 h-20 object-cover border"
          loading="lazy"
          alt=""
        />
      ) : (
        // thumbnail fallback error icon
        <div className="w-20 h-20 object-cover border flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 stroke-gray-600"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
      )}
      <div className="flex flex-col justify-between pl-4 w-full">
        <div className="w-full flex justify-between">
          <div>
            <Typography size="body1/medium">{item.title}</Typography>
            <Typography size="body2/normal" variant="secondary">
              {item.description}
            </Typography>
          </div>

          <Typography size="body1/medium">
            {priceToCurrency(item.quantity * item.unit_price)}
          </Typography>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            {/* decrease cart quantity */}
            <Button
              type="button"
              variant="icon"
              className="w-4 !p-0"
              onClick={decreaseQty}
              disabled={loadingQty.value}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-4 stroke-primary-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 12h-15"
                />
              </svg>
            </Button>

            {/* quantity / loading */}
            {loadingQty.value ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class={"animate-spin w-4 stroke-primary-600 duration-500"}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            ) : (
              <Typography variant="app-primary" size="body1/normal">
                {item.quantity}
              </Typography>
            )}

            {/* increase cart quantity */}
            <Button
              type="button"
              variant="icon"
              className="w-4 !p-0"
              onClick={increaseQty}
              disabled={loadingQty.value}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-4 stroke-primary-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </Button>
          </div>
          <Button type="button" variant="icon" onClick={removeProductFromCart}>
            <Typography variant="app-primary" size="small/medium">
              Remove
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
