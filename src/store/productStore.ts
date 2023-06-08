import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { signal } from "@preact/signals";

export const selectedCategoriesIds = signal<string[]>([]);

export const count = signal<null | number>(null);
export const limit = signal<number>(6);
export const offset = signal<number>(0);
export const sortOrder = signal<string | undefined>(undefined);

export interface Product {
  id?: string;
  title?: string;
  thumbnail?: string;
  handle?: string;
  description?: string;
  prices?: {
    inr?: number;
    usd?: number;
    eur?: number;
  };
}

export const products = signal<Product[]>([]);
