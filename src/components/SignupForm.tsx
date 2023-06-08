import Input from "@components/Input";
import Button from "@components/Button";
import FormControl from "@components/FormControl";
import useLocalStorage from "@hooks/useLocalStorage";
import user from "@api/user";

const SignupForm = () => {
  const { set } = useLocalStorage();
  const handleCreateUser = async (data: any) => {
    try {
      user.register(data)
      history.back();
    } catch (err) {
      console.log(err);
    }
  };
  return (
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

      <Button type="submit" variant="primary" className="mt-4">
        Sign Up
      </Button>
    </FormControl>
  );
};

export default SignupForm;
