import Button from "@components/Button";
import Typography from "@components/Typography";
import { useSignal } from "@preact/signals";
import Category from "./Accordion/Category";
import type { ProductCategory } from "@medusajs/medusa";

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
            <span class="text-sm font-medium text-gray-700">Filters</span>
            <svg
              class="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"></path>
            </svg>
          </Button>
        </div>

        <div class={`${isCategoriesOpen.value ? "block" : "hidden"} lg:block`}>
          <form class="space-y-4 divide-y divide-gray-200">
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
      </aside>
    </div>
  );
};

export default CategoriesOpt;
