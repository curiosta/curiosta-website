import {
  ShippingAddress,
  addShippingAddress,
} from "@api/user/addShippingAddress";
import Button from "./Button";
import FormControl from "./FormControl";
import Input from "./Input";
import Typography from "./Typography";

const ShippingForm = () => {
  const handleShippingAddress = async (data: ShippingAddress) => {
    try {
      const {
        first_name,
        last_name,
        address_1,
        city,
        country_code,
        postal_code,
        phone,
      } = data;

      const addShipping = await addShippingAddress({
        first_name,
        last_name,
        address_1,
        city,
        country_code,
        postal_code,
        phone,
      });
      console.log(addShipping);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="bg-white">
      <div class="relative mx-auto max-w-2xl  lg:px-8 ">
        <FormControl
          class="px-4 sm:px-6 mt-4 flex flex-col gap-5 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16"
          noValidate
          mode="onSubmit"
          onSubmit={handleShippingAddress}
        >
          <Typography
            tag="h5"
            size="h5/medium"
            variant="primary"
            id="summary-heading"
          >
            Shipping Address
          </Typography>
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
          <div class="flex justify-between items-center gap-2">
            <Input
              name="email"
              type="email"
              label="Email address"
              autocomplete="email"
              required={{ message: "Email is required!", value: true }}
              placeholder={"example@gmail.com"}
              validator={(value) =>
                !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)
                  ? "Invalid email!"
                  : true
              }
            />
            <Input
              name="phone"
              type="phone"
              label="Phone Number"
              autocomplete="phone"
              required={{ message: "Phone number is required!", value: true }}
              placeholder={"1234567890"}
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
              label="city"
              autocomplete="address-level2"
              required={{ message: "City is required!", value: true }}
            />

            <Input
              type="text"
              label="State"
              name="region"
              required={{ message: "State is required!", value: true }}
              autocomplete="address-level1"
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
              type="text"
              name="country_code"
              label="Country code"
              required={{
                message: "Country code is required!",
                value: true,
              }}
              autocomplete="Country-code"
            />
          </div>

          <div class="mt-5 border-t border-gray-200 pt-6 flex  justify-end ">
            <Button
              type="submit"
              variant="primary"
              title="Save address"
              className="!w-auto"
            >
              Save Address
            </Button>
          </div>
        </FormControl>
      </div>
    </div>
  );
};

export default ShippingForm;
