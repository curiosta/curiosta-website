/**
 * Commerce seam for the future Medusa 1.x cart (store-backend, M3+).
 *
 * M1: online checkout is OFF. Product pages render <BuyBox>, which shows the
 * price (INR incl. GST) or "price on request" plus a "Request a quote" action.
 * When STORE_ENABLED becomes true, BuyBox will mount a client island that uses
 * `createStoreClient()` (to be implemented with @medusajs/medusa-js 6.1.x)
 * against PUBLIC_MEDUSA_BACKEND_URL (same origin: /store/* on CloudFront).
 * Cart id key carried over from the old storefront: localStorage 'curiosta:cartId'.
 */
export const STORE_ENABLED = import.meta.env.PUBLIC_STORE_ENABLED === 'true';
export const MEDUSA_BACKEND_URL: string = import.meta.env.PUBLIC_MEDUSA_BACKEND_URL ?? '';
export const CART_STORAGE_KEY = 'curiosta:cartId';
export const CURRENCY = 'inr' as const;
export const REGION_NAME = 'India' as const;

export type { StoreClient, CartLineInput, MinimalCart } from './types';
export { RESERVED_PATH_PREFIXES, isReservedPath } from './reserved-paths';

export function createStoreClient(): never {
  throw new Error('Online store is not enabled in M1 (PUBLIC_STORE_ENABLED=false).');
}
