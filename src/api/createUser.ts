import Medusa from "@medusajs/medusa-js";
export type User = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export const createUser = ({
  first_name,
  last_name,
  email,
  password,
}: User) => {
  const medusa = new Medusa({
    baseUrl: import.meta.env.PUBLIC_BASE_URL,
    maxRetries: 3,
  });
  return medusa.customers.create({
    first_name,
    last_name,
    email,
    password,
  });
};
