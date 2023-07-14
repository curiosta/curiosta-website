import { addShippingAddress } from "@api/user/addShippingAddress";
import Button from "@components/Button";
import FormControl from "@components/FormControl";
import Input from "@components/Input";
import type { AddressCreatePayload } from "@medusajs/medusa";
import user from "@api/user";
import cart from "@api/cart";
import { Signal, useSignal } from "@preact/signals";
import { useRef } from "preact/hooks";
import region from "@api/region";
import PhoneInput from "@components/PhoneInput";

const AddressForm = ({
  selectedAddressId,
  isNewAddress,
}: {
  selectedAddressId: Signal<string | null>;
  isNewAddress: Signal<boolean>;
}) => {
  const isLoading = useSignal<boolean>(false);
  const resetButtonRef = useRef<HTMLButtonElement>(null);

  const handleShippingAddress = async (data: AddressCreatePayload) => {
    try {
      isLoading.value = true;
      const payloadAddress = { ...data };

      if (region.selectedCountry.value?.iso_2) {
        payloadAddress.country_code = region.selectedCountry.value?.iso_2;
      } else {
        throw new Error("Country not selected, Try reloading page!.");
      }

      const addShipping = await addShippingAddress(payloadAddress);
      const latestAddress = [...addShipping.customer.shipping_addresses].pop();

      // add shipping address in cart
      await cart.updateCart({
        shipping_address: latestAddress?.id,
        billing_address: latestAddress?.id,
      });

      await user.refetch();
      selectedAddressId.value = latestAddress?.id || null;
      latestAddress?.id && (isNewAddress.value = false);
      resetButtonRef.current?.click();
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  return (
    <div class="bg-white pt-4">
      <div class="relative mx-auto max-w-2xl">
        <FormControl
          class="sm:px-6 mt-4 flex flex-col gap-5 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-4"
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
          <div class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-4">
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
              minLength={5}
              autocomplete="postal-code"
            />
            <PhoneInput />
          </div>

          <div class="mt-5 border-t border-gray-200 pt-6">
            <div className="flex justify-end items-center gap-4">
              <Button
                variant="danger"
                type="reset"
                className="!w-max"
                ref={resetButtonRef}
              >
                Reset
              </Button>
              <Button
                type="submit"
                variant="primary"
                title="Save address"
                className="!w-auto max-xs:!px-4"
                disabled={isLoading.value}
              >
                {isLoading.value ? "Loading..." : "Save Address"}
              </Button>
            </div>
          </div>
        </FormControl>
      </div>
    </div>
  );
};

export default AddressForm;
