import user from "@api/user";
import Button from "@components/Button";
import FormControl from "@components/FormControl";
import Input from "@components/Input";
import SuccessAlert from "@components/SuccessAlert";
import Typography from "@components/Typography";
import { useSignal } from "@preact/signals";

type Props = {
  token: string | null;
  email: string | null;
};

const PasswordResetForm = ({ email, token }: Props) => {
  const isLoading = useSignal<boolean>(false);
  const errorMessage = useSignal<string>("");
  const successMessage = useSignal<string>("");

  const handlePasswordReset = async (data: any) => {
    isLoading.value = true;
    const { password, cpassword } = data;
    if (errorMessage.value || successMessage.value) {
      errorMessage.value = "";
      successMessage.value = "";
    }
    try {
      if (!token || !email) return;
      if (password === cpassword) {
        await user.passwordReset({ email, password, token });
        successMessage.value = "Your password has been changed successfully!";
      } else {
        errorMessage.value = "Password and confirmation password do not match.";
      }
    } catch (error) {
      const errorResponse = (error as any)?.toJSON?.();
      if (errorResponse) {
        errorMessage.value = "Failed to add new password!.";
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
        onSubmit={handlePasswordReset}
        className="flex flex-col gap-2"
      >
        <Input
          name="password"
          type="password"
          label="New Password"
          autocomplete="current-password"
          required={{ value: true, message: "Password is required!" }}
          minLength={{
            value: 6,
            message: "Minimum 6 characters are required!",
          }}
          placeholder="New password"
          disabled={successMessage.value.length > 0}
        />
        <Input
          name="cpassword"
          type="password"
          label="Confirm Password"
          autocomplete="current-password"
          required={{ value: true, message: "Password is required!" }}
          minLength={{
            value: 6,
            message: "Minimum 6 characters are required!",
          }}
          placeholder="Confirm new password"
          disabled={successMessage.value.length > 0}
        />

        <Button
          type="submit"
          variant={"primary"}
          className="mt-4"
          disabled={isLoading.value || successMessage.value.length > 0}
        >
          {isLoading.value ? "Loading..." : "Change Password "}
        </Button>
        <Typography variant="error">{errorMessage}</Typography>
      </FormControl>
      <div class={`${successMessage.value ? "block mt-2" : "hidden"}`}>
        <SuccessAlert
          link="/login"
          linkText="Login"
          alertMessage={successMessage.value}
        />
      </div>
    </div>
  );
};

export default PasswordResetForm;
