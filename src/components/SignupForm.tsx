import { ChangeEvent, useRef } from "preact/compat";
import { User, createUser } from "@api/createUser";
import Input from "@components/Input";
import Button from "@components/Button";

const SignupForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleCreateUser = async (e: ChangeEvent) => {
    e.preventDefault();
    try {
      if (formRef.current) {
        const formData = new FormData(formRef.current);
        const { first_name, last_name, email, password } = Object.fromEntries(
          formData.entries()
        ) as User;
        const newUser = await createUser({
          first_name,
          last_name,
          email,
          password,
        });
        console.log(newUser);
        console.log("user created");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form class="space-y-6" onSubmit={handleCreateUser} ref={formRef}>
      <div class="flex justify-between items-center">
        <Input
          name="first_name"
          type="text"
          label="First Name"
          autocomplete="given-name"
          required
          minLength={3}
          maxLength={20}
          placeholder={"John"}
        />

        <Input
          name="last_name"
          type="text"
          label="Last Name"
          autocomplete="family-name"
          required
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
        required
        placeholder={"example@gmail.com"}
        pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
      />

      <Input
        name="password"
        type="password"
        label="Password"
        autocomplete="current-password"
        required
        minLength={6}
        placeholder={"********"}
      />

      <Button type="submit" variant={"primary"}>
        Sign Up
      </Button>
    </form>
  );
};

export default SignupForm;
