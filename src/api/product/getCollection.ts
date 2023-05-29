import medusa from "@api/medusa";

export const getCollection = (collection_id: string) => {
  return medusa.collections.retrieve(collection_id);
};
