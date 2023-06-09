export type SupportedCurrencies = 'usd' | 'eur' | 'inr';
export type CurrencyMap = Record<SupportedCurrencies, string>

export const currencyMap: CurrencyMap = {
  usd: "$",
  eur: "€",
  inr: "₹",
};


export const regionCurrencyMap: Record<'us' | 'in' | 'eu', SupportedCurrencies> = {
  'us': 'usd',
  'in': 'inr',
  'eu': 'eur'
}