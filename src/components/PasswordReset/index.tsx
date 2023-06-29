import user from "@api/user";
import Button from "@components/Button";
import FormControl from "@components/FormControl";
import Input from "@components/Input";
import Typography from "@components/Typography";
import { useSignal } from "@preact/signals";

type Props = {
  token: string | null;
};

const PasswordResetForm = ({ token }: Props) => {
  const isLoading = useSignal<boolean>(false);
  const errorMessage = useSignal<string>("");
  const handlePasswordReset = async (data: any) => {
    isLoading.value = true;
    const { email, password, cpassword } = data;
    if (errorMessage.value) {
      errorMessage.value = "";
    }
    try {
      if (!token) return;
      if (password === cpassword) {
        await user.passwordReset({ email, password, token });
        await user.login({ email, password });
        window.location.href = "/";
      } else {
        errorMessage.value = "Password and confirmation password do not match.";
      }
    } catch (error) {
      const errorResponse = (error as any)?.toJSON?.();
      if (errorResponse) {
        errorMessage.value =
          "Failed to login, Please check email and password!.";
      }
    } finally {
      isLoading.value = false;
    }
  };

  return (
    <FormControl
      noValidate
      mode="onSubmit"
      onSubmit={handlePasswordReset}
      className="flex flex-col gap-2"
    >
      <Input
        name="email"
        type="email"
        label="Email address"
        autocomplete="email"
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
        label="New Password"
        autocomplete="current-password"
        required={{ value: true, message: "Password is required!" }}
        minLength={{ value: 6, message: "Minimum 6 characters are required!" }}
        placeholder="New password"
      />
      <Input
        name="cpassword"
        type="password"
        label="Confirm Password"
        autocomplete="current-password"
        required={{ value: true, message: "Password is required!" }}
        minLength={{ value: 6, message: "Minimum 6 characters are required!" }}
        placeholder="Confirm new password"
      />

      <Button
        type="submit"
        variant={"primary"}
        className="mt-4"
        disabled={isLoading.value}
      >
        {isLoading.value ? "Loading..." : "Log in"}
      </Button>
      <Typography variant="error">{errorMessage}</Typography>
    </FormControl>
  );
};

export default PasswordResetForm;
