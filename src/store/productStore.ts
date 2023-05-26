import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { signal } from "@preact/signals";

export const selectedCategoriesIds = signal<string[]>([]);

export const count = signal<null | number>(null);
export const limit = signal<number>(6);
export const offset = signal<number>(0);

export const products = signal<PricedProduct[]>([]);
