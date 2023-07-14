import cart from "@api/cart";
import Typography from "@components/Typography";
import Button from "@components/Button";

const NavCartItem = () => {
  const totalCartItems = cart.store.value?.items?.reduce(
    (acc, curVal) => acc + curVal.quantity,
    0
  );

  return (
    <Button
      type="button"
      variant="icon"
      onClick={() => (cart.open.value = true)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-6 h-6 fill-none text-gray-400 hover:text-gray-500"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
      <Typography size="body2/medium" className="mx-2">
        {cart.loading.value === "cart:get" ? "" : totalCartItems}
      </Typography>
    </Button>
  );
};

export default NavCartItem;
