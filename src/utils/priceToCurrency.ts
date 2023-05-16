import { SupportedCurrencies, currencyMap } from "@components/CurrencyMap"
import { cart } from "@store/cartStore"

const priceToCurrency = (price: number | null | undefined, currency_code = cart.value.region?.currency_code): string => {
  const currencySign = currencyMap[currency_code as SupportedCurrencies]
  if (!price) {
    return 'N/A';
  }
  return `${currencySign}${(price / 100).toFixed(2)}`
}

export default priceToCurrency