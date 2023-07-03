import cart from "@api/cart";
import Dropdown from "./Dropdown";
import Typography from "./Typography";
import user from "@api/user";
import Chip from "./Chip";

const RightNav = () => {
  const totalCartItems = cart.store.value?.items?.reduce(
    (acc, curVal) => acc + curVal.quantity,
    0
  );

  return (
    <div>
      <Dropdown title="My Account">
        <Dropdown.Item noHoverEffects tabIndex={-1}>
          <Typography size="body2/normal">
            {user.state.value === "unauthenticated" ? "Browsing" : "Signed in"} as
          </Typography>
          <Typography size="body2/medium" className="my-0.5" ellipses={1}>
            {user.state.value === "loading" ? "Loading..." : null}
            {user.state.value === "authenticated" ? user.customer.value?.email : null}
            {user.state.value === "unauthenticated" ? 'Guest' : null}
          </Typography>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => cart.open.value = true}>
          <div className="flex justify-between items-center">
            <Typography>Cart</Typography>
            <Chip variant='primary2'>
              {cart.loading.value === 'cart:get' ? 'Loading...' : totalCartItems}
            </Chip>
          </div>
        </Dropdown.Item>
        <Dropdown.Item onClick={() => location.href = '/orders'}>
          Orders
        </Dropdown.Item>

        {user.state.value !== 'loading' ? <Dropdown.Divider /> : null}
        {user.state.value === "authenticated" ? (
          <Dropdown.Item onClick={async () => {
            await user.logout()
            location.href = '/login'
          }}>
            Sign out
          </Dropdown.Item>
        ) : null}
        {user.state.value === "unauthenticated" ? (
          <Dropdown.Item onClick={() => location.href = '/login'}>
            Login
          </Dropdown.Item>
        ) : null}
        {user.state.value === "unauthenticated" ? (
          <Dropdown.Item onClick={() => location.href = '/signup'}>
            Signup
          </Dropdown.Item>
        ) : null}
      </Dropdown>
    </div>
  );
};

export default RightNav;
