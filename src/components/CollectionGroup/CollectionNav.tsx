import type { ProductCollection } from "@medusajs/medusa";
import type { FunctionComponent } from "preact";

type TCollections = {
  collections: ProductCollection[];
  handle: string | undefined;
};

const CollectionNav: FunctionComponent<TCollections> = ({
  collections,
  handle,
}) => {
  const activeHandle = handle
    ? collections?.find(
        (collection) => collection.handle.toLowerCase() === handle.toLowerCase()
      )?.handle
    : null;

  return (
    <nav
      class={`p-4  justify-center bg-gray-50 my-4 ${
        collections.length ? "flex" : "hidden"
      }`}
    >
      <ul role="list" class="flex flex-wrap gap-x-8">
        {collections.map((collection) => (
          <li
            class={`${
              collection.handle === activeHandle
                ? "font-semibold border-b border-gray-400"
                : ""
            }`}
          >
            <a
              href={`/collection/${collection.handle}`}
              class="text-base leading-6 text-gray-600 hover:text-gray-900"
            >
              {collection.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CollectionNav;
