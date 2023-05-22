import Button from "@components/Button";
import type { Signal } from "@preact/signals";

interface Props {
  offset: Signal<number>;
  count: number;
  limit: Signal<number>;
}

const index = ({ offset, count, limit }: Props) => {
  const hanldeNext = () => {
    if (offset.value + limit.value < count) {
      offset.value = Math.min(offset.value + limit.value, count * limit.value);
    }
  };
  const handlePrev = () => {
    if (offset.value > 0) {
      offset.value = Math.max(0, offset.value - limit.value);
    }
  };

  const isEndResult = count ? offset.value + limit.value > count : null;

  return (
    <div
      class="flex items-center justify-between border-t border-gray-200 bg-white mt-20 px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div class="hidden sm:block">
        <p class="text-sm text-gray-700 flex gap-1">
          Showing
          <span class="font-medium">{offset.value + 1}</span>
          to
          <span class="font-medium">
            {isEndResult ? count : offset.value + limit.value}
          </span>
          over
          <span class="font-medium">{count}</span>
          results
        </p>
      </div>
      <div class="flex flex-1 justify-between sm:justify-end gap-4">
        <Button className={"!w-fit !px-3 !py-2"} onClick={handlePrev}>
          Previous
        </Button>
        <Button className={"!w-fit !px-3 !py-2"} onClick={hanldeNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default index;
