import { MeiliSearch } from "meilisearch";

if (!import.meta.env.PUBLIC_MEILISEARCH_HOST || !import.meta.env.PUBLIC_MEILISEARCH_API) {
  throw new Error('PUBLIC_MEILISEARCH_HOST or PUBLIC_MEILISEARCH_API was not found in environment variables!')
}

const client = new MeiliSearch({
  host: import.meta.env.PUBLIC_MEILISEARCH_HOST,
  apiKey: import.meta.env.PUBLIC_MEILISEARCH_API,
});


const index = client.index("products");

interface ProductSort {
  category?: string[];
  sortOrder?: string;
}

export const productSort = async ({ category, sortOrder }: ProductSort) => {
  if (category?.length) {
    return await index.search("", {
      sort: [`prices.usd:${sortOrder}`],
      filter: [`categories IN [${category}]`],
    });
  } else {
    if (sortOrder !== undefined) {
      return await index.search("", { sort: [`prices.usd:${sortOrder}`] });
    } else {
      return await index.search("");
    }
  }
};
