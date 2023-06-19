import Button from "@components/Button";
import Typography from "@components/Typography";
import { useSignal } from "@preact/signals";
import Category from "./Accordion/Category";
import type { ProductCategory } from "@medusajs/medusa";
import { selectedCategoriesIds } from "@store/productStore";

interface Props {
  categories: ProductCategory[];
}

const CategoriesOpt = ({ categories }: Props) => {
  const isCategoriesOpen = useSignal(false);

  // filter top categories
  const topCategories = categories.filter(
    (categ) => categ.parent_category_id === null
  );

  return (
    <div>
      <aside>
        <Typography tag="h2" className="sr-only">
          Filters
        </Typography>

        {/* <!-- Mobile filter dialog toggle, controls the 'mobileFilterDialogOpen' state. --> */}
        <div class="flex items-center  w-full lg:hidden">
          <Button
            type="button"
            variant={"icon"}
            className="!w-fit !border-none"
            onClick={() => (isCategoriesOpen.value = !isCategoriesOpen.value)}
          >
            <span class="text-sm font-medium text-gray-700 ">Category</span>
            <Typography
              size="body2/medium"
              variant="app-primary"
              className={`bg-primary-600/10 w-6 h-6 mx-1 items-center justify-center rounded-full ${
                selectedCategoriesIds.value.length ? "flex" : "hidden"
              }`}
            >
              {selectedCategoriesIds.value.length}
            </Typography>
            {!isCategoriesOpen.value ? (
              <svg
                class="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 12h-15"
                />
              </svg>
            )}
          </Button>
        </div>

        <div class={`hidden lg:block`}>
          <form class="space-y-4 divide-y divide-gray-200 mt-6">
            <div class="pt-10">
              <fieldset>
                <Typography size="body1/semi-bold" className="block">
                  Category
                </Typography>

                <div class="space-y-2 pt-6">
                  {topCategories?.map((category) => (
                    <Category category={category} depth={0} />
                  ))}
                </div>
              </fieldset>
            </div>
          </form>
        </div>

        {/* for mobile screen  */}
        <div
          class={`lg:hidden fixed right-0 top-0 bg-white z-30 h-full translate-x-full transition-all overflow-y-auto
        ${isCategoriesOpen.value ? "!translate-x-0" : ""}
        `}
        >
          <form class="space-y-4 divide-y divide-gray-200 p-8">
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
              <div class="space-y-2 pt-6 ">
                {topCategories?.map((category) => (
                  <Category category={category} depth={0} />
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
