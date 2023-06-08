import medusa from "@api/medusa";
import type { RequestQueryFields } from "@medusajs/medusa";

export const collectionList = async ({ limit, offset }: RequestQueryFields) => {
  return medusa.collections.list({ limit, offset });
};
