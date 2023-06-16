export type CurrencyMap = keyof typeof currencyMap;

export const currencyMap = {
  usd: "$",
  eur: "€",
  inr: "₹",
};


export const regionCurrencyMap: Record<'us' | 'in' | 'eu', CurrencyMap> = {
  'us': 'usd',
  'in': 'inr',
  'eu': 'eur'
}