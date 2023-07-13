import Dropdown from "./Dropdown";
import Typography from "./Typography";
import user from "@api/user";
import Select from "./Select";
import region from "@api/region";
import cart from "@api/cart";

const RightNav = () => {
  return (
    <div>
      <Dropdown title="My Account">
        {/* profile */}
        <Dropdown.Item noHoverEffects tabIndex={-1}>
          <Typography size="body2/normal">
            {user.state.value === "unauthenticated" ? "Browsing" : "Signed in"}{" "}
            as
          </Typography>
          <Typography size="body2/medium" className="my-0.5" ellipses={1}>
            {user.state.value === "loading" ? "Loading..." : null}
            {user.state.value === "authenticated"
              ? user.customer.value?.email
              : null}
            {user.state.value === "unauthenticated" ? "Guest" : null}
          </Typography>
        </Dropdown.Item>

        <Dropdown.Divider />
        {/* region selector */}

        <Select
          roundedAvatars={false}
          defaultValue={region.selectedCountry.value?.iso_2 || ''}
          className="pt-0"
          options={region.countries.value?.map(
            (item, index) => ({
              id: `region-selector-${index}`,
              label: item.display_name,
              value: item.iso_2, avatar: `/countries/${item.iso_2}.svg`
            })
          )}
          ListBoxValueComponent={({ selected }) => (
            <Dropdown.Item className="flex items-center gap-2">
              {selected ? (
                <>
                  <img src={`/countries/${selected.value}.svg`} alt={`Flag of ${selected.label}`} />
                  <Typography size="body2/normal">{selected.label}</Typography>
                </>
              ) : (
                <>
                  Select a location.
                </>
              )}
            </Dropdown.Item>
          )}
          onChange={async (option) => {
            const selectedCountryId = option && region.countries.value.find(country => country.iso_2 === option?.value)?.id
            if (selectedCountryId) {
              if (!cart.store.value) return;

              const cartItemsLength = cart.store.value.items.length;
              if (cartItemsLength) {
                const answer = confirm(
                  "Changing country will clear cart items, Do you still want to proceed?"
                );

                if (answer) {

                  await cart.resetCartId();
                  await region.setCountry(selectedCountryId)

                } else {
                  throw new Error("User cancelled the prompt!")
                }


              } else {
                await region.setCountry(selectedCountryId)
              }
            }
          }}
        />

        <Dropdown.Divider />
        {/* orders */}

        <Dropdown.Item onClick={() => location.href = '/orders'}>
          Orders
        </Dropdown.Item>

        {/* authentication */}
        {user.state.value !== 'loading' ? <Dropdown.Divider /> : null}
        {user.state.value === "authenticated" ? (
          <Dropdown.Item
            onClick={async () => {
              await user.logout();
              location.href = "/login";
            }}
          >
            Sign out
          </Dropdown.Item>
        ) : null}
        {user.state.value === "unauthenticated" ? (
          <Dropdown.Item onClick={() => (location.href = "/login")}>
            Login
          </Dropdown.Item>
        ) : null}
        {user.state.value === "unauthenticated" ? (
          <Dropdown.Item onClick={() => (location.href = "/signup")}>
            Signup
          </Dropdown.Item>
        ) : null}
      </Dropdown>
    </div>
  );
};

export default RightNav;
