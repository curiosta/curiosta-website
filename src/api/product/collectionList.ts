import medusa from "@api/medusa";

export const collectionList = async () => {
  return medusa.collections.list();
};
