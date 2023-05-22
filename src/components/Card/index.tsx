import Typography from "@components/Typography";
import type { Product } from "@api/product/index.d";
import { CurrencyMap, currencyMap } from "@utils/CurrencyMap";
import useLocalStorage from "@hooks/useLocalStorage";

const Card = ({ id, thumbnail, title, description, variants }: Product) => {
  const { get } = useLocalStorage();
  const localRegion = get<{ curr_code?: string }>("region");
  const amount = variants
    ? variants[0]?.prices?.find(
        (item) => item.currency_code === localRegion?.curr_code
      )?.amount
    : undefined;
  const currency = localRegion?.curr_code as keyof CurrencyMap;

  return (
    <div class="card">
      <div class="group relative">
        <div class="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
          <img
            src={thumbnail ?? undefined}
            alt={title}
            class="h-full w-full object-cover object-center"
          />
        </div>
        <Typography size="body2/medium" variant="secondary" className="mt-4 ">
          <a href={`/products/${id}`}>
            <span class="absolute inset-0"></span>
            {title}
          </a>
        </Typography>
        <Typography size="body2/normal" variant="secondary" className="mt-1 ">
          {description?.slice(0, 30) + "..." || "Description not available"}
        </Typography>
        <Typography size="body2/medium" variant="primary" className="mt-1 ">
          {currencyMap[currency]}
          {amount ? (amount / 100).toFixed(2) : "Price not available"}
        </Typography>
      </div>
    </div>
  );
};

export default Card;
