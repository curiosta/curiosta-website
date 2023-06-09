import Button from '@components/Button'
import FormControl from '@components/FormControl'
import Input from '@components/Input'
import { useSignal } from '@preact/signals'
import { MutableRef, useRef } from 'preact/hooks'

type TSearchInputProps = {
  searchQuery: string | null;
}

const SearchInput = ({ searchQuery }: TSearchInputProps) => {
  const searchValue = useSignal<string>(searchQuery || '');
  const buttonRef = useRef() as MutableRef<HTMLButtonElement>;
  return (
    <div className={`flex justify-center mx-4`}>
      <FormControl className={`w-full max-w-3xl flex`}>
        <div className={`w-full`}>
          <Input onChange={(e) => {
            searchValue.value = e.target.value
          }} onKeyDown={(e) => {
            if (e.key?.toLowerCase() === 'enter') {
              buttonRef.current.click()
            }
          }} required placeholder={`Search for products...`} value={searchValue.value} autoFocus={!searchQuery} className={`rounded-r-none h-10`} />
        </div>
        <Button link={`/search?q=${searchValue.value}`} ref={buttonRef} className={`p-0 w-10 h-10 flex justify-center items-center rounded-l-none`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </Button>
      </FormControl>
    </div>
  )
}

export default SearchInput