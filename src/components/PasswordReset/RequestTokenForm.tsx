import user from "@api/user";
import Button from "@components/Button";
import FormControl from "@components/FormControl";
import Input from "@components/Input";
import SuccessAlert from "@components/SuccessAlert";
import Typography from "@components/Typography";
import { useSignal } from "@preact/signals";

const RequestTokenForm = () => {
  const isLoading = useSignal<boolean>(false);
  const successMessage = useSignal<string>("");
  const errorMessage = useSignal<string>("");

  const handleRequestToken = async (data: any) => {
    isLoading.value = true;
    if (errorMessage.value || successMessage.value) {
      errorMessage.value = "";
      successMessage.value = "";
    }
    try {
      await user.requestPasswordReset(data);
      successMessage.value =
        "An email has been sent. Please click on the link when you get it.";
    } catch (error) {
      const errorResponse = (error as any)?.toJSON?.();
      if (errorResponse) {
        errorMessage.value =
          "Failed to send, Please enter valid email or try again!.";
      }
    } finally {
      isLoading.value = false;
    }
  };

  return (
    <div class="bg-white px-6 py-12 pt-4 shadow sm:rounded-lg sm:px-12">
      <FormControl
        noValidate
        mode="onSubmit"
        onSubmit={handleRequestToken}
        className="flex flex-col gap-2"
      >
        <Typography size="body1/normal" variant="secondary" className="my-4 ">
          Enter the email address which is associated with your account and
          we'll send you a link to rest your password.
        </Typography>
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
          disabled={successMessage.value.length > 0}
        />
        <Button
          type="submit"
          variant={"primary"}
          className="mt-4"
          disabled={isLoading.value || successMessage.value.length > 0}
        >
          {isLoading.value ? "Loading..." : "Send"}
        </Button>
        <Typography variant="error">{errorMessage}</Typography>
      </FormControl>
      <div class={`${successMessage.value ? "block mt-2" : "hidden"}`}>
        <SuccessAlert alertMessage={successMessage.value} />
      </div>
    </div>
  );
};

export default RequestTokenForm;
