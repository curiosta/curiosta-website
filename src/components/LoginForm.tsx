import Button from "@components/Button";
import Input from "@components/Input";
import FormControl from "@components/FormControl";
import user from "@api/user";
import { useSignal } from "@preact/signals";
import Typography from "./Typography";

const LoginForm = () => {
  const errorMessage = useSignal<string>('');
  const handleLoginUser = async (data: any) => {
    if (errorMessage.value) {
      errorMessage.value = ''
    }
    try {
      await user.login(data);
      if (['/signup', '/login', '/forgot-password', '/password-reset'].filter((i) => document.referrer.indexOf(i) < 0 ? false : true).length) {
        window.location.href = '/';
      } else {
        history.back();
      }
    } catch (error) {
      const errorResponse = (error as any)?.toJSON?.();
      if (errorResponse) {
        errorMessage.value = 'Failed to login, Please check email and password!.'
      }
    }
  };

  return (
    <FormControl
      noValidate
      mode="onSubmit"
      onSubmit={handleLoginUser}
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
        label="Password"
        autocomplete="current-password"
        required={{ value: true, message: 'Password is required!' }}
        minLength={{ value: 6, message: 'Minimum 6 characters are required!' }}
        placeholder="Your Curiosta password"
      />
      <Button type="submit" variant={"primary"} className="mt-4">
        Log In
      </Button>
      <Typography variant='error'>{errorMessage}</Typography>
    </FormControl>
  );
};

export default LoginForm;
