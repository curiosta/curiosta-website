import search from '@api/search';
import Button from '@components/Button';
import Input from '@components/Input';
import { useSignal, type Signal } from '@preact/signals'
import type { Product } from '@store/productStore'
import debounce from '@utils/debounce';
import type { FunctionComponent } from 'preact';

type TSearchInputProps = {
  products: Signal<Product[]>;
}

const SearchInput: FunctionComponent<TSearchInputProps> = ({ products }) => {
  const searchValue = useSignal<string>('')

  const searchProducts = () => {
    debounce(async () => {
      const res = await search.getProducts(searchValue.value, { sort: 'desc', categories: undefined });
      products.value = res.products
    })
  }

  return (
    <div className={`flex w-3/4`}>
      <Input placeholder="Search products..." className={`rounded-r-none h-10`} onChange={(e) => {
        searchValue.value = e.target.value
        searchProducts()
      }} />
      <Button className={`p-0 w-10 h-10 rounded-l-none flex items-center justify-center`} onClick={searchProducts}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </Button>
    </div>
  )
}

export default SearchInput