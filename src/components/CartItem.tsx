import type { LineItem } from "@medusajs/medusa";
import { useSignal } from "@preact/signals";
import cart from "@api/cart";
import { cx } from "class-variance-authority";
import Typography from "./Typography";
import priceToCurrency from "@utils/priceToCurrency";
import Button from "@components/Button";
import Input from "@components/Input";
import type { ChangeEvent } from "preact/compat";

const CartItem = ({ item }: { item: LineItem }) => {
  const errorMessage = useSignal<string | null>(null);

  const handleQty = async (e: ChangeEvent<HTMLInputElement>) => {
    const quantity = e.currentTarget.valueAsNumber;
    try {
      await cart.setItemQuantity(item.id, quantity);
      errorMessage.value = null;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        errorMessage.value = error.message;
      }
    }
  };

  return (
    <div
      className={cx(
        "flex ",
        cart.loading.value === "cart:line_items:remove" && "grayscale"
      )}
    >
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
          <div className="flex flex-col gap-2 items-center my-2">
            <Input
              type="number"
              min="1"
              value={item.quantity}
              onBlur={handleQty}
              className={`!w-12 !px-0 text-center`}
            />
            <Typography
              size="body2/semi-bold"
              variant="error"
              className={`${errorMessage.value ? "block" : "hidden"}`}
            >
              {errorMessage.value}
            </Typography>
          </div>
          <Button
            type="button"
            variant="icon"
            onClick={() => cart.removeItem(item.id)}
            disabled={cart.loading.value === "cart:line_items:remove"}
          >
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
