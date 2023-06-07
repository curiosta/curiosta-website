import Typography from "@components/Typography";
import { currencyMap } from "@utils/CurrencyMap";
import type { FunctionComponent } from "preact";
import region from "@api/region";
import type { CurrencyMap } from "@utils/CurrencyMap";
import type { SearchProductResult } from "@api/search";

type TProductCard = {
  product: SearchProductResult
}

const SearchProduct: FunctionComponent<TProductCard> = ({ product }) => {
  const currency = region.selectedCountry.value?.region.currency_code as keyof CurrencyMap;

  return (
    <a href={`/products/${product.handle}`}>
      <div class="card max-w-xs">
        <div class="group relative">
          <div class="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
            <img
              src={product.image ?? undefined}
              alt={product.name}
              class="h-full w-full object-cover object-center"
            />
          </div>
          <Typography size="body2/medium" variant="secondary" className="mt-4">
            <span class="absolute inset-0"></span>
            {product.name}
          </Typography>
          <Typography size="body2/normal" variant="secondary" className="mt-1 ">
            {product.description?.slice(0, 30) + "..." || "Description not available"}
          </Typography>
          <Typography size="body2/medium" variant="primary" className="mt-1 ">
            {currency ? currencyMap[currency] : ''}
            {product.prices[currency] ? (product.prices[currency] / 100).toFixed(2) : "Price not available"}
          </Typography>
        </div>
      </div>
    </a>
  );
};

export default SearchProduct;
