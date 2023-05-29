import Button from "@components/Button";
import type { Signal } from "@preact/signals";

interface Props {
  offset: Signal<number>;
  count: Signal<number | null>;
  limit: Signal<number>;
  isLoading: Signal<boolean>;
}

const index = ({ offset, count, limit, isLoading }: Props) => {
  const hanldeNext = () => {
    if (count.value) {
      if (offset.value + limit.value < count.value) {
        offset.value = Math.min(
          offset.value + limit.value,
          count.value * limit.value
        );
      }
    }
  };
  const handlePrev = () => {
    if (offset.value > 0) {
      offset.value = Math.max(0, offset.value - limit.value);
    }
  };

  const isEndResult = count.value
    ? offset.value + limit.value > count.value
    : null;

  return (
    <div
      class="flex items-center justify-between border-t border-gray-200 bg-white mt-20 px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div class="hidden sm:block">
        <p class="text-sm text-gray-700 flex gap-1">
          Showing
          <span class="font-medium">{count.value ? offset.value + 1 : 0}</span>-
          <span class="font-medium">
            {isEndResult ? count.value : offset.value + limit.value || 0}
          </span>
          of
          <span class="font-medium">{count.value || 0}</span>
          results
        </p>
      </div>
      <div class="flex flex-1 justify-between sm:justify-end gap-4">
        <Button
          className={`!w-fit !px-3 !py-2 ${
            offset.value <= 0 ? "hidden" : "inline-flex"
          }`}
          onClick={handlePrev}
          disabled={isLoading.value || offset.value <= 0}
        >
          Previous
        </Button>
        <Button
          className={`!w-fit !px-3 !py-2 ${
            isEndResult ? "hidden" : "inline-flex"
          }`}
          onClick={hanldeNext}
          disabled={isLoading.value || isEndResult === true}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default index;
