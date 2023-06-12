import Button from "@components/Button"
import type { FunctionComponent } from "preact"

type TOffsetPagination ={
  limit: number
  count:number
  offsetValue : number

}

const index: FunctionComponent<TOffsetPagination> = ({limit,offsetValue,count}) => {

  const isEndResult = offsetValue + limit >= count;
  const prvBtnDisabled = offsetValue <= 0 
  const nextBtnDisabled = isEndResult;


  return (
    <div
    class="flex items-center justify-between border-t border-gray-200 bg-white mt-20 px-4 py-3 sm:px-6"
    aria-label="Pagination"
  >
    <div class="hidden sm:block">
      <p class="text-sm text-gray-700 flex gap-1">
        Showing
        <span class="font-medium">{offsetValue + 1}</span>-
        <span class="font-medium">
          {isEndResult ? count : offsetValue + limit || 0}
        </span>
        of
        <span class="font-medium">{count || 0}</span>
        results
      </p>
    </div>
    <div class="flex flex-1 justify-between sm:justify-end gap-4">
      <Button
        link={`?offset=${
          offsetValue > 0 ? Math.max(0, offsetValue - limit) : 0
        }`}
        className={`!w-fit !px-3 !py-2 ${
          prvBtnDisabled ? "hidden" : "inline-flex"
        }`}
        disabled={prvBtnDisabled}
      >
        Previous
      </Button>
      <Button
        link={`?offset=${
          offsetValue + limit < count
            ? Math.min(offsetValue + limit, count * limit)
            : count - 1
        }`}
        className={`!w-fit !px-3 !py-2 ${
          isEndResult ? "hidden" : "inline-flex"
        }`}
        disabled={nextBtnDisabled}
      >
        Next
      </Button>
    </div>
  </div>
  )
}

export default index