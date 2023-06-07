import { InstantMeiliSearchInstance, instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import type { CurrencyMap } from "@utils/CurrencyMap";

type TFindTypes = 'products'

export type SearchProductPrices = Record<keyof CurrencyMap, number>

export type SearchProductResult = {
  name: string;
  description: string;
  image: string;
  handle: string;
  prices: SearchProductPrices
}

type SearchProductResponse = {
  title: string;
  description: string;
  thumbnail: string;
  handle: string;
  prices: SearchProductPrices
}


export type TSearchGet = {
  products: SearchProductResult[]
}

class Search {
  client: InstantMeiliSearchInstance;

  constructor() {
    if (!import.meta.env.PUBLIC_MEILISEARCH_HOST || !import.meta.env.PUBLIC_MEILISEARCH_API) {
      throw new Error('PUBLIC_MEILISEARCH_HOST or PUBLIC_MEILISEARCH_API was not found in environment variables!')
    }
    this.client = instantMeiliSearch(import.meta.env.PUBLIC_MEILISEARCH_HOST, import.meta.env.PUBLIC_MEILISEARCH_API)
  }

  async get(find: TFindTypes, query: string): Promise<TSearchGet> {
    if (!query.length) throw new Error('Empty search value!');

    const result = await this.client.search([{ indexName: find, query }])

  }


}

const search = new Search()
export default search;