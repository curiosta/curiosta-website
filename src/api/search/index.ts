import {
  InstantMeiliSearchInstance,
  instantMeiliSearch,
} from "@meilisearch/instant-meilisearch";
import type { Product } from "@store/productStore";
import type { SearchParams } from "meilisearch";

class Search {
  client: InstantMeiliSearchInstance;
  constructor() {
    if (
      !import.meta.env.PUBLIC_MEILISEARCH_HOST ||
      !import.meta.env.PUBLIC_MEILISEARCH_API
    ) {
      throw new Error(
        "PUBLIC_MEILISEARCH_HOST or PUBLIC_MEILISEARCH_API was not found in environment variables!"
      );
    }

    this.client = instantMeiliSearch(
      import.meta.env.PUBLIC_MEILISEARCH_HOST,
      import.meta.env.PUBLIC_MEILISEARCH_API
    );
  }

  async getProducts(
    query = "",
    {
      sort,
      categories,
    }: { sort: "asc" | "desc"; categories: undefined | string[] }
  ) {
    const searchOptions: SearchParams = {};
    if (sort) {
      searchOptions.sort = [`prices.usd:${sort}`];
    }
    if (categories?.length) {
      searchOptions.filter = [`categories IN [${categories.join(", ")}]`];
    }

    const res = (
      await this.client.search([
        { indexName: "products", facet: "", query, params: searchOptions },
      ])
    ).results[0];

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
      count: res.nbHits,
    };
  }
}

const search = new Search();
export default search;
