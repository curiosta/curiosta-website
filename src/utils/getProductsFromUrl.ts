import search from "@api/search";
import parseQuery from "./parseQuery";
import type { TProductsQueryParam } from "@components/Products";
const getProductsFromUrl = async (url: string | URLSearchParams) => {

  if (typeof url === 'string') {
    url = new URL(url).searchParams;
  }
  const params = parseQuery<TProductsQueryParam>(url);
  const result = await search.getProducts(params.q, params)
  return {
    result,
    params
  }
}
export default getProductsFromUrl