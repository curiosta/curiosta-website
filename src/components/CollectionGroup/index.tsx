import type { FunctionComponent } from "preact";

type TCollectionGroup = {
  title?: string;
  link?: string;
  linkText?: string
}
const CollectionGroup: FunctionComponent<TCollectionGroup> = ({ title, children, link, linkText }) => {
  return (
    <div className='collection-group'>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-12 sm:mb-0">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
          {link ? (
            <a href={link} className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block">
              {linkText}
              <span aria-hidden="true"> &rarr;</span>
            </a>
          ) : null}
        </div>
        {children}
        {link ? (
          <div className="mt-8 text-sm md:hidden">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              {linkText}
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default CollectionGroup