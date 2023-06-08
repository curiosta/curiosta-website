import Typography from "@components/Typography";
import type { ProductCollection } from "@medusajs/medusa";
import type { FunctionComponent } from "preact";

type TCollections = {
  collections: ProductCollection[];
};

const CollectionCard: FunctionComponent<TCollections> = ({ collections }) => {
  return (
    <div class="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
      {collections.map((collection) => (
        <div class="group relative">
          <div class="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg"
              alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
              class="h-full w-full object-cover object-center"
            />
          </div>
          <Typography tag="h3" size="body1/semi-bold" className="mt-6">
            <a href={`/collection/${collection.handle}`}>
              <span class="absolute inset-0"></span>
              {collection.title}
            </a>
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default CollectionCard;
