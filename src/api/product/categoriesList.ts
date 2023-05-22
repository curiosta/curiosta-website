import medusa from "@api/medusa";
interface CategoryChild {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  handle: string;
  parent_category_id: string | null;
  rank: number;
}
interface Product {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  title: string;
  subtitle: string;
  description: string;
  handle: string;
  is_giftcard: boolean;
  status: string;
  thumbnail: string;
  profile_id: string;
  weight: number;
  length: number | null;
  height: number | null;
  width: number | null;
  hs_code: string | null;
  origin_country: string | null;
  mid_code: string | null;
  material: string | null;
  collection_id: string;
  type_id: string | null;
  discountable: boolean;
  external_id: string | null;
  metadata: Record<string, any>;
}

export interface CategoriesList {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  handle: string;
  parent_category_id: string | null;
  rank: number;
  parent_category: any | null;
  category_children: CategoryChild[];
  products: Product[];
}

export const categoriesList = async () => {
  return medusa.productCategories.list({
    expand: "products",
    include_descendants_tree: true,
  });
};
