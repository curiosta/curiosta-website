import { collectionList } from "@api/product/collectionList";
import type { ProductCollection } from "@medusajs/medusa";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import CollectionCard from "./CollectionCard";
import Pagination from "@components/Pagination";
import Typography from "@components/Typography";

const CollectionContainer = () => {
  const collections = useSignal<ProductCollection[]>([]);
  const isLoading = useSignal(false);
  const count = useSignal<null | number>(null);
  const limit = useSignal<number>(10);
  const offset = useSignal<number>(0);

  const getCollectionList = async () => {
    try {
      isLoading.value = true;
      const res = await collectionList({
        limit: limit.value,
        offset: offset.value,
      });
      collections.value = res?.collections;
      count.value = res?.count;
    } catch (error) {
    } finally {
      isLoading.value = false;
    }
  };

  useEffect(() => {
    getCollectionList();
  }, [offset.value]);

  return (
    <div>
      {!isLoading.value ? (
        <CollectionCard collections={collections.value} />
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
