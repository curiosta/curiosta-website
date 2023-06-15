import Button from '@components/Button';
import FormControl from '@components/FormControl';
import Input from '@components/Input';
import type { Signal } from '@preact/signals';
import type { Product } from '@store/productStore';
import debounce from '@utils/debounce';
import getProductsFromUrl from '@utils/getProductsFromUrl';
import type { FunctionComponent } from 'preact';

type TSearchInputProps = {
  products: Signal<Product[]>
}

const SearchInput: FunctionComponent<TSearchInputProps> = ({ products }) => {
  const onSearchChange = (e: any) => {
    const url = new URL(window.location.href)
    url.searchParams.set('q', e.target.value)
    window.history.replaceState(undefined, '', url.href)

    debounce(async () => {
      const { result } = await getProductsFromUrl(url.href)
      products.value = result.products;
    })
  }

  return (
    <div className={`flex w-3/4`}>
      <FormControl className={'flex w-full'}>
        <Input placeholder="Search products..." className={`rounded-r-none h-10`} onChange={onSearchChange} />
        <Button className={`p-0 w-10 h-10 rounded-l-none flex items-center justify-center`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </Button>
      </FormControl>
    </div>
  )
}

export default SearchInput