import { signal } from "@preact/signals";

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