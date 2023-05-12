import medusa from "@api/medusa";

export const getUser = () => {
  return medusa.auth.getSession();
};
