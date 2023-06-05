import useKeyboard from "@hooks/useKeyboard"
import { MutableRef, useEffect, useRef } from "preact/hooks"
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

const searchClient = instantMeiliSearch(
  'https://ms-3b27a85cd47a-3850.sgp.meilisearch.io',
  'a8a480424441c763aa05c4258467c8d90260f4f0'
);


const Search = () => {
  const inputRef = useRef() as MutableRef<HTMLInputElement>
  const { addListener } = useKeyboard('/');


  useEffect(() => {
    addListener(() => {
      inputRef.current?.focus()
    })
  }, []);

  const handleSubmit = ({ search }: { search: string }) => {

  }

  return (
    <div>
      <InstantSearch
        indexName="curiosta-search"
        searchClient={searchClient}
      >
        <SearchBox />
        <Hits hitComponent={Hit} />
      </InstantSearch>
      {/*       
      <FormControl onSubmit={handleSubmit}>
        <Input type='search' name='search' required placeholder="Find anything..." ref={inputRef} rightAdornment={<Button className={`rounded-l-none !p-0 w-12 flex justify-center items-center`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </Button>} />
      </FormControl> */}
    </div>
  )
}

const Hit = ({ hit }) => {
  console.log(hit);
  return <Highlight attribute="name" hit={hit} />
};

export default Search