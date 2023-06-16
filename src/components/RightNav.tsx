import cart from "@api/cart";
import Button from "./Button";
import user from "@api/user";
import { cx } from "class-variance-authority";

interface Props {
  screen?: "mobile";
}

const RightNav = ({ screen }: Props) => {
  const totalCartItems = cart.store.value?.items?.reduce(
    (acc, curVal) => acc + curVal.quantity,
    0
  );

  return (
    <div
      class={cx(
        "lg:flex lg:items-center lg:justify-end",
        screen === 'mobile' ? 'flex flex-col gap-4 mt-4' : 'hidden'
      )}
    >
      <div>
        {user.state.value === "authenticated" ? (
          <Button
            variant="primary"
            className="leading-6 !px-2 !py-1 !w-fit rounded-md"
            onClick={async () => {
              await user.logout()
              window.location.href = '/login'
            }}
          >
            Log out
          </Button>
        ) : (
          <>
            <Button
              link="/signup"
              className="leading-6 !bg-transparent !text-primary-900 !shadow-none !px-0 lg:!px-2 !py-1 !w-fit rounded-md mr-3"
            >
              Sign Up
            </Button>

            <Button
              link="/login"
              variant="primary"
              className="leading-6 !px-2 !py-1 !w-fit rounded-md"
            >
              Login
            </Button>
          </>
        )}
      </div>

      <div class="flow-root lg:ml-6">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            cart.open.value = true;
          }}
          class="group -m-2 flex items-center p-2"
        >
          <svg
            class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            ></path>
          </svg>
          <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
            {totalCartItems}
          </span>
          <span class="sr-only">items in cart, view bag</span>
        </a>
      </div>
    </div>
  );
};

export default RightNav;
