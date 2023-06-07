import { MeiliSearch } from "meilisearch";
const client = new MeiliSearch({
  host: "https://ms-3b27a85cd47a-3850.sgp.meilisearch.io",
  apiKey: import.meta.env.PUBLIC_MEILISEARCH_API_KEY,
});

const update = () =>
  client.index("products").updateFilterableAttributes(["categories"]);
update();

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
