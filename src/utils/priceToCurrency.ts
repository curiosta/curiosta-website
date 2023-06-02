import { SupportedCurrencies, currencyMap } from "@utils/CurrencyMap";
import cart from "@api/cart";

const priceToCurrency = (
  price: number | null | undefined,
  currency_code = cart.store.value?.region?.currency_code
): string => {
  const currencySign = currencyMap[currency_code as SupportedCurrencies];
  if (!price) {
    return "N/A";
  }
  return `${currencySign}${(price / 100).toFixed(2)}`;
};

export default priceToCurrency;
