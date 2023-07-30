import cart from "@api/cart";
import { createPortal } from "preact/compat";
import { cx } from "class-variance-authority";
import priceToCurrency from "@utils/priceToCurrency";
import Button from "@components/Button";
import Typography from "@components/Typography";
import EmptyCart from "./EmptyCart";
import CartItem from "@components/CartItem";
import user from "@api/user";
import { checkoutOpen } from "@store/checkoutStore";
import useKeyboard from "@hooks/useKeyboard";

const CartDrawer = () => {
  const { addListener } = useKeyboard("Escape");
  // remove app's default scroll if cart is open
  document.body.style.overflow = cart.open.value ? "hidden" : "auto";

  addListener(() => {
    if (!checkoutOpen.value) {
      cart.open.value = false;
    }
  });

  return createPortal(
    <div
      className={cx(
        `fixed w-full flex h-screen top-0 left-0 opacity-0 pointer-events-none -z-10 transition-all duration-100`,
        cart.open.value && `z-50 opacity-100 pointer-events-auto`
      )}
    >
      {/* overlay */}
      <div
        className="hidden sm:block w-full bg-primary-100/30"
        onClick={() => (cart.open.value = false)}
      />

      {/* cart drawer */}
      <div
        className={cx(
          `w-full absolute top-0 right-0 h-screen translate-x-full sm:max-w-sm overflow-auto bg-white transition-all`,
          cart.open.value && `!translate-x-0`
        )}
      >
        {!cart.store.value?.items?.length ? (
          <EmptyCart />
        ) : (
          <div className="p-4 pt-6 relative">
            <div className="flex justify-between items-center border-b p-2">
              <Typography size="h6/bold">Shopping Cart</Typography>
              {/* close cart */}
              <Button variant="icon" onClick={() => (cart.open.value = false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-400 w-6"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </div>
            <div className="flex flex-col px-4">
              {/* cart items */}

              {cart.store.value.items.map((item) => (
                <div className="py-4 border-b last:border-b-0">
                  <CartItem item={item} />
                </div>
              ))}
            </div>
            <div className="sticky bg-white border-t bottom-0 left-0 w-full h-44 p-4 flex flex-col justify-between">
              {/* checkout billing and details */}
              <div>
                <div className="flex justify-between">
                  <Typography size="body1/bold">Subtotal</Typography>
                  <Typography size="body1/bold">
                    {priceToCurrency(cart.store.value.subtotal)}
                  </Typography>
                </div>
                <Typography size="small/normal" variant="secondary">
                  Shipping and taxes are calculated at checkout.
                </Typography>
              </div>
              <div>
                <Button
                  type="button"
                  variant="primary"
                  disabled={user.state.value === "loading"}
                  onClick={() => {
                    if (user.state.value === "authenticated") {
                      cart.open.value = false;
                      checkoutOpen.value = true;
                    } else {
                      window.location.href = "/login";
                    }
                  }}
                >
                  Checkout
                </Button>
                <div className="flex gap-1 justify-center mt-1">
                  <Typography size="body2/normal">or</Typography>
                  <Typography
                    variant="app-primary"
                    size="body2/bold"
                    className="cursor-pointer"
                    onClick={() => (cart.open.value = false)}
                  >
                    Continue Shopping
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default CartDrawer;
