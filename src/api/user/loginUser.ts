import medusa from "@api/medusa";

export interface LoginUser {
  email: string;
  password: string;
}

export const loginUser = ({ email, password }: LoginUser) => {
  return medusa.auth.authenticate({
    email,
    password,
  });
};
