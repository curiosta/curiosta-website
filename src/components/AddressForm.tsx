import { addShippingAddress } from "@api/user/addShippingAddress";
import Button from "@components/Button";
import FormControl from "@components/FormControl";
import Input from "@components/Input";
import type { AddressCreatePayload } from "@medusajs/medusa";
import useLocalStorage from "@hooks/useLocalStorage";
import user from "@api/user";
import { updateCart } from "@api/cart/updateCart";
import { useSignal } from "@preact/signals";

const AddressForm = () => {
  const isLoading = useSignal<boolean>(false);
  const { get } = useLocalStorage();
  const localRegion = get<{ countryCode: string }>("region");
  const localCartId = get("cartId");

  const handleShippingAddress = async (data: AddressCreatePayload) => {
    try {
      isLoading.value = true;
      const payloadAddress = { ...data };
      if (localRegion?.countryCode) {
        payloadAddress.country_code = localRegion.countryCode;
      }

      const addShipping = await addShippingAddress(payloadAddress);
      // add shipping address in cart
      if (localCartId) {
        const addCartShipping = await updateCart({
          cartId: localCartId,
          shipping_address:
            addShipping.customer.shipping_addresses[
              addShipping.customer.shipping_addresses.length - 1
            ].id,
          billing_address:
            addShipping.customer.shipping_addresses[
              addShipping.customer.shipping_addresses.length - 1
            ].id,
        });
      }
      user.refetch();
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  return (
    <div class="bg-white pt-4">
      <div class="relative mx-auto max-w-2xl  lg:px-8 ">
        <FormControl
          class="px-4 sm:px-6 mt-4 flex flex-col gap-5 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-4"
          noValidate
          mode="onSubmit"
          onSubmit={handleShippingAddress}
        >
          <div class="flex justify-between items-center gap-2">
            <Input
              name="first_name"
              type="text"
              label="First Name"
              autocomplete="given-name"
              required={{ message: "First name is required!", value: true }}
              minLength={{
                message: "Minimum 3 characters are required!",
                value: 3,
              }}
              maxLength={20}
              placeholder="John"
            />

            <Input
              name="last_name"
              type="text"
              label="Last Name"
              required={{ message: "Last name is required!", value: true }}
              autocomplete="family-name"
              minLength={3}
              maxLength={20}
              placeholder={"Doe"}
            />
          </div>

          <Input
            type="text"
            label="Address"
            name="address_1"
            autocomplete="street-address"
            required={{ message: "Address is required!", value: true }}
          />
          <div class=" grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
            <Input
              type="text"
              name="city"
              label="City"
              autocomplete="address-level2"
              required={{ message: "City is required!", value: true }}
            />

            <Input
              type="text"
              name="postal_code"
              label="Postal code"
              required={{
                message: "Postal code is required!",
                value: true,
              }}
              autocomplete="postal-code"
            />
            <Input
              name="phone"
              type="number"
              label="Phone Number"
              autocomplete="phone"
              required={{ message: "Phone number is required!", value: true }}
              placeholder={"1234567890"}
            />
          </div>

          <div class="mt-5 border-t border-gray-200 pt-6 flex justify-end">
            <Button
              type="submit"
              variant="primary"
              title="Save address"
              className="!w-auto"
              disabled={isLoading.value}
            >
              {isLoading.value ? "Loading..." : "Save Address"}
            </Button>
          </div>
        </FormControl>
      </div>
    </div>
  );
};

export default AddressForm;
