import type { Product } from "@store/productStore";
import type { CurrencyMap } from "@utils/CurrencyMap";
import { SearchParams, MeiliSearch, Index } from "meilisearch";

type TProductSearchOptions = { sort?: "asc" | "desc"; categories?: string[], region?: keyof CurrencyMap }

class Search {
  client: MeiliSearch;
  productIndex: Index<any>;
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
      region = 'usd'
    }: TProductSearchOptions
  ) {
    const searchOptions: SearchParams = {};
    if (sort) {
      searchOptions.sort = [`prices.${region}:${sort}`];
    }
    if (categories?.length) {
      searchOptions.filter = `categories IN [${categories.join(', ')}]`;
    }

    const res = await this.productIndex.search(query, searchOptions);

    const products = res?.hits.map((hit: any) => {
      return {
        title: hit.title,
        description: hit.description,
        handle: hit.handle,
        id: hit.id,
        prices: hit.prices,
        thumbnail: hit.thumbnail,
      } as Product;
    });

    return {
      products: products || [],
      count: res.estimatedTotalHits,
    };
  }
}

const search = new Search()

export default search;
