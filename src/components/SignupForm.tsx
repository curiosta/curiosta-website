import { ChangeEvent, useRef } from "preact/compat";
import { User, createUser } from "../api/createUser";

const SignupForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleCreateUser = async (e: ChangeEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData(formRef.current!);
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
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form class="space-y-6" onSubmit={handleCreateUser} ref={formRef}>
      <div class="flex justify-between items-center">
        <div>
          <label
            for="firstName"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            First Name
          </label>
          <div class="mt-2">
            <input
              id="firstName"
              name="first_name"
              type="text"
              autocomplete="given-name"
              required
              class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              minLength={3}
              maxLength={20}
            />
          </div>
        </div>
        <div>
          <label
            for="lastName"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Last Name
          </label>
          <div class="mt-2">
            <input
              id="lastName"
              name="last_name"
              type="text"
              autocomplete="family-name"
              required
              class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              minLength={3}
              maxLength={20}
            />
          </div>
        </div>
      </div>
      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Email address
        </label>
        <div class="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
          />
        </div>
      </div>

      <div>
        <label
          for="password"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Password
        </label>
        <div class="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            minLength={6}
            class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
