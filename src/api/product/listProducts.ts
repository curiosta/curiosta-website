import medusa from "@api/medusa";
interface ListProduct {
  limit?: number;
  category_id?: string[];
  offset?: number;
  order?: string;
}

export const listProducts = async ({
  limit,
  offset,
  category_id,
  order,
}: ListProduct) => {
  return medusa.products.list({ limit, offset, category_id, order });
};
