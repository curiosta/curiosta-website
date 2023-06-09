import type { SearchProductResult } from '@api/search'
import SearchProduct from './SearchProduct'

const SearchProducts = ({ searchedProducts }: { searchedProducts: SearchProductResult[] }) => {
  return (
    <>
      <div class="max-w-7xl mx-auto mt-8">
        <div class="flex justify-center">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {
              searchedProducts.map((product) => {
                return <SearchProduct product={product} />
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchProducts