import Input from "@components/Input";
import Button from "@components/Button";
import FormControl from "@components/FormControl";
import user from "@api/user";
import { useSignal } from "@preact/signals";
import Typography from "./Typography";
import SuccessAlert from "./SuccessAlert";

const SignupForm = () => {
  const errorMessage = useSignal<string>("");
  const isLoading = useSignal<boolean>(false);
  const successMessage = useSignal<string>("");
  const counter = useSignal<number>(5);

  const handleCreateUser = async (data: any) => {
    isLoading.value = true;
    if (errorMessage.value || successMessage.value) {
      errorMessage.value = "";
      successMessage.value = "";
    }
    try {
      await user.register(data);
      successMessage.value =
        "Congratulations! Your account has been successfully created.";

      const interval = setInterval(() => {
        counter.value--;
        if (counter.value <= 0) {
          clearInterval(interval);
          if (
            ["/signup", "/login", "/forgot-password", "/password-reset"].filter(
              (i) => (document.referrer.indexOf(i) < 0 ? false : true)
            ).length
          ) {
            window.location.href = "/";
          } else {
            history.back();
          }
        }
      }, 1000);
    } catch (error) {
      const errorResponse = (error as any)?.toJSON?.();
      if (errorResponse) {
        errorMessage.value = "Email already exists!";
      }
    } finally {
      isLoading.value = false;
    }
  };
  return (
    <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
      <FormControl
        noValidate
        mode="onSubmit"
        className="flex flex-col gap-2"
        onSubmit={handleCreateUser}
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
          name="password"
          type="password"
          label="Password"
          required={{ message: "Password is required!", value: true }}
          autocomplete="current-password"
          minLength={6}
          placeholder="Enter password"
        />

        <Button
          type="submit"
          variant="primary"
          className="mt-4"
          disabled={isLoading.value || successMessage.value.length > 0}
        >
          {isLoading.value ? "Loading..." : "Sign Up"}
        </Button>

        <Typography variant="error">{errorMessage}</Typography>
      </FormControl>
      <div class={`relative ${successMessage.value ? "block mt-2" : "hidden"}`}>
        <SuccessAlert alertMessage={successMessage.value} />
        {/* counter progess bar */}
        <span class="w-full h-1 absolute bottom-0 left-0 bg-success-50">
          <span
            class="block h-full  bg-success-400"
            style={{
              width: `${counter.value * 20}%`,
              transition: "width 1s linear",
            }}
          ></span>
        </span>
      </div>
    </div>
  );
};

export default SignupForm;
