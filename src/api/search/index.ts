import region from "@api/region";
import { signal } from "@preact/signals";
import type { Product } from "@store/productStore";
import type { CurrencyMap } from "@utils/CurrencyMap";
import { SearchParams, MeiliSearch, Index } from "meilisearch";

type TProductSearchOptions = {
  sort?: "asc" | "desc";
  categories?: string | string[],
  currencyRegion?: CurrencyMap,
  page?: number;
}
export type TGetProductResult = {
  count: number;
  limit: number;
  offset: number;
  page: number;
  products: Product[];
}

export const limitState = signal(12);
export const countState = signal(0);
export const offsetState = signal(0);
export const pageState = signal(1);


class Search {
  client: MeiliSearch;
  productIndex: Index<Product>;

  constructor() {
    if (
      !import.meta.env.PUBLIC_MEILISEARCH_HOST ||
      !import.meta.env.PUBLIC_MEILISEARCH_API
    ) {
      throw new Error(
        "PUBLIC_MEILISEARCH_HOST or PUBLIC_MEILISEARCH_API was not found in environment variables!"
      );
    }
    this.client = new MeiliSearch({ host: import.meta.env.PUBLIC_MEILISEARCH_HOST, apiKey: import.meta.env.PUBLIC_MEILISEARCH_API })
    this.productIndex = this.client.index('products')
  }

  async getProducts(
    query = "",
    {
      sort,
      categories,
      currencyRegion = region.selectedCountry.value?.region.currency_code as CurrencyMap,
      page = 1,
    }: TProductSearchOptions
  ): Promise<TGetProductResult> {
    const searchOptions: SearchParams = {};
    if (sort && currencyRegion) {
      searchOptions.sort = [`prices.${currencyRegion}:${sort}`];
    }
    if (categories?.length) {
      searchOptions.filter = `categories IN [${Array.isArray(categories) ? categories.join(', ') : categories}]`;
    }

    const offset = page <= 1 ? 0 : (page - 1) * limitState.value;

    searchOptions.offset = offset;
    searchOptions.limit = limitState.value;

    const res = await this.productIndex.search(query, searchOptions);

    const products = res?.hits.map((hit) => {
      return {
        title: hit.title,
        description: hit.description,
        handle: hit.handle,
        id: hit.id,
        prices: hit.prices,
        thumbnail: hit.thumbnail,
      }
    });

    countState.value = res.estimatedTotalHits;
    offsetState.value = res.offset;
    limitState.value = res.limit;
    pageState.value = page;

    return {
      products: products || [],
      count: res.estimatedTotalHits,
      offset: res.offset,
      limit: res.limit,
      page,
    };
  }
}

const search = new Search()

export default search;
