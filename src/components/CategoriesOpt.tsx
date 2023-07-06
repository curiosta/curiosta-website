import Button from "@components/Button";
import Typography from "@components/Typography";
import type { Signal } from "@preact/signals";
import Category from "./Accordion/Category";
import type { ProductCategory } from "@medusajs/medusa";
import type { TProductsQueryParam } from "./Products";
import type { Product } from "@store/productStore";
import { useEffect } from "preact/hooks";
import getProductsFromUrl from "@utils/getProductsFromUrl";

interface Props {
  categories: ProductCategory[];
  params: Signal<Partial<TProductsQueryParam>>;
  products: Signal<Product[]>;
  selectedCategoriesIds: Signal<string[]>;
  isCategoriesOpen: Signal<boolean>;
}

const CategoriesOpt = ({
  categories,
  products,
  params,
  isCategoriesOpen,
  selectedCategoriesIds,
}: Props) => {
  // filter top categories
  const topCategories = categories.filter(
    (category) => category.parent_category_id === null
  );

  const toggleSelectedIds = (id: string) => {
    if (selectedCategoriesIds.value.includes(id)) {
      selectedCategoriesIds.value = selectedCategoriesIds.value.filter(
        (v) => v !== id
      );
    } else {
      selectedCategoriesIds.value = [...selectedCategoriesIds.value, id];
    }
  };

  // remove app's default scroll if category is open
  useEffect(() => {
    document.body.style.overflow = isCategoriesOpen.value ? "hidden" : "auto";
  }, [isCategoriesOpen.value]);

  const handleClearAll = async () => {
    selectedCategoriesIds.value = [];
    const url = new URL(window.location.href);
    url.searchParams.set("categories", "");
    window.history.replaceState(undefined, "", url.href);
    const { result } = await getProductsFromUrl(url.href);
    products.value = result.products;
  };

  return (
    <div>
      <aside>
        <Typography tag="h2" className="sr-only">
          Filters
        </Typography>

        <div class={`hidden lg:block`}>
          <form class="space-y-4 divide-y divide-gray-200 mt-6">
            <div class="pt-10">
              <fieldset>
                <Typography size="body1/semi-bold" className="block">
                  Category
                </Typography>
                <div
                  class={`items-center justify-end ${
                    selectedCategoriesIds.value.length ? "flex" : "hidden"
                  }`}
                >
                  <Button type="button" variant="icon" onClick={handleClearAll}>
                    <Typography variant="app-primary" size="small/medium">
                      Clear all
                    </Typography>
                  </Button>
                </div>
                <div
                  class={`space-y-2 ${
                    selectedCategoriesIds.value.length ? "pt-0" : "pt-6"
                  }`}
                >
                  {topCategories?.map((category) => (
                    <Category
                      toggleSelectedIds={toggleSelectedIds}
                      products={products}
                      selectedCategoriesIds={selectedCategoriesIds}
                      category={category}
                      params={params}
                      depth={0}
                    />
                  ))}
                </div>
              </fieldset>
            </div>
          </form>
        </div>

        {/* for mobile screen  */}
        <div
          class={`lg:hidden fixed left-0 top-0 opacity-0 -z-30 w-full h-screen bg-primary-100/40 transition-all overflow-y-auto
          ${isCategoriesOpen.value ? "!z-50 opacity-100" : ""}
        `}
        >
          {/* close on outside click */}
          <div
            className="hidden sm:block h-full"
            onClick={() => (isCategoriesOpen.value = false)}
          />
          <form
            class={`absolute top-0 right-0 bg-white space-y-4 divide-y w-full sm:max-w-sm divide-gray-200 p-8 transition-all translate-x-full ${
              isCategoriesOpen.value ? "!translate-x-0" : ""
            }`}
          >
            <fieldset>
              <div className="flex justify-between items-center p-2 border-b">
                <Typography size="h6/semi-bold">Category</Typography>
                <Button
                  type="button"
                  variant="icon"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => (isCategoriesOpen.value = false)}
                >
                  <span class="sr-only">Close</span>
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </Button>
              </div>
              <div
                class={`items-center justify-end mt-1 ${
                  selectedCategoriesIds.value.length ? "flex" : "hidden"
                }`}
              >
                <Button type="button" variant="icon" onClick={handleClearAll}>
                  <Typography variant="app-primary" size="small/medium">
                    Clear all
                  </Typography>
                </Button>
              </div>
              <div
                class={`space-y-2 ${
                  selectedCategoriesIds.value.length ? "pt-0" : "pt-6"
                }`}
              >
                {topCategories?.map((category) => (
                  <Category
                    params={params}
                    products={products}
                    selectedCategoriesIds={selectedCategoriesIds}
                    toggleSelectedIds={toggleSelectedIds}
                    category={category}
                    depth={0}
                  />
                ))}
              </div>
            </fieldset>
          </form>
        </div>
      </aside>
    </div>
  );
};

export default CategoriesOpt;
