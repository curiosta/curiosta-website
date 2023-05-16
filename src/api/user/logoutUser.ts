import medusa from "@api/medusa";

export const logoutUser = () => {
  return medusa.auth.deleteSession();
};
