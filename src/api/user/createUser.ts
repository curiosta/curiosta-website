import medusa from "@api/medusa";
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
  return medusa.customers.create({
    first_name,
    last_name,
    email,
    password,
  });
};
