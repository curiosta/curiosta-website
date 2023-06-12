import { collectionList } from "@api/product/collectionList";
import { listProducts } from "@api/product/listProducts";
import Typography from "@components/Typography";
import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { useSignal } from "@preact/signals";
import type { FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";
import Pagination from "@components/Pagination";
import CollectionNav from "./CollectionNav";
import type { ProductCollection } from "@medusajs/medusa";
import ProductContainer from "@components/ProductContainer";

type TCollectionContainer = {
  title: string | undefined;
};

const CollectionContainer: FunctionComponent<TCollectionContainer> = ({
  title,
}) => {
  const isLoading = useSignal(false);
  const product = useSignal<PricedProduct[]>([]);
  const collections = useSignal<ProductCollection[]>([]);
  const count = useSignal<null | number>(null);
  const limit = useSignal<number>(10);
  const offset = useSignal<number>(0);

  const getProductList = async () => {
    try {
      isLoading.value = true;
      if (!title) return;
      const collectionResponse = await collectionList();
      collections.value = collectionResponse.collections;
      const collectionId = collectionResponse.collections.find(
        (collection) => collection.title === title
      )?.id;
      const res = await listProducts({
        collection_id: [collectionId || ""],
        limit: limit.value,
        offset: offset.value,
      });
      product.value = res?.products;

      count.value = res?.count;
    } catch (error) {
    } finally {
      isLoading.value = false;
    }
  };

  useEffect(() => {
    getProductList();
  }, [offset.value]);

  return (
    <div>
      {!isLoading.value ? (
        <div>
          <CollectionNav collections={collections.value} title={title} />
          <Typography
            size="h5/semi-bold"
            className=" tracking-tight capitalize"
          >
            {product.value[0]?.collection?.title}
          </Typography>
          <ProductContainer products={product.value} />
        </div>
      ) : (
        <Typography
          size="body1/semi-bold"
          variant="secondary"
          className="text-center py-20"
        >
          Loading...
        </Typography>
      )}
      <Pagination
        isLoading={isLoading}
        count={count}
        limit={limit}
        offset={offset}
      />
    </div>
  );
};

export default CollectionContainer;
