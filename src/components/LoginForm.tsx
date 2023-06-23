import Button from "@components/Button";
import Input from "@components/Input";
import Checkbox from "@components/Checkbox";
import FormControl from "@components/FormControl";
import user from "@api/user";

const LoginForm = () => {
  const handleLoginUser = async (data: any) => {
    try {
      await user.login(data);
      history.back();
    } catch (error) {
      console.log(error);
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
        required
        minLength={6}
        placeholder="Your Curiosta password"
      />
      <div class="flex items-center justify-end">
        {/* <Checkbox name="remember-me" label="Remember me" /> */}
        <div class="text-sm leading-6">
          <a
            href="#"
            class="font-semibold text-app-primary-600 hover:text-app-primary-500"
          >
            Forgot password?
          </a>
        </div>
      </div>

      <Button type="submit" variant={"primary"} className="mt-4">
        Log In
      </Button>
    </FormControl>
  );
};

export default LoginForm;
