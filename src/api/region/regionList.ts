import medusa from "@api/medusa";

export const regionList = () => {
  return medusa.regions.list();
};
