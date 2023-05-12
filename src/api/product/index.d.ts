interface Price {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  currency_code: string;
  amount: number;
  min_quantity: number | null;
  max_quantity: number | null;
  price_list_id: string | null;
  variant_id: string;
  region_id: string | null;
  price_list: any | null;
}
interface Option {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  value: string;
  option_id: string;
  variant_id: string;
  metadata: any | null;
}

interface Variants {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  title: string;
  product_id: string;
  sku: string | null;
  barcode: string | null;
  ean: string | null;
  upc: string | null;
  variant_rank: number;
  inventory_quantity: number;
  allow_backorder: boolean;
  manage_inventory: boolean;
  hs_code: string | null;
  origin_country: string | null;
  mid_code: string | null;
  material: string | null;
  weight: number | null;
  length: number | null;
  height: number | null;
  width: number | null;
  metadata: any;
  prices: Price[];
  options: Option[];
  original_price: number | null;
  calculated_price: number | null;
  original_price_incl_tax: number | null;
  calculated_price_incl_tax: number | null;
  original_tax: number | null;
  calculated_tax: number | null;
  tax_rates: any[] | null;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  external_id: string | null;
  description: string;
  handle: string;
  is_giftcard: boolean;
  discountable: boolean;
  thumbnail: string | null;
  profile_id: string;
  collection_id: string | null;
  type_id: string | null;
  weight: number | null;
  length: number | null;
  height: number | null;
  width: number | null;
  hs_code: string | null;
  origin_country: string | null;
  mid_code: string | null;
  material: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  metadata: any | null;
  variants: Variants[];
  options: any[];
  images: {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    url: string;
    metadata: any | null;
  }[];
  tags: string[];
  collection: any;
  type: any;
}
