import Typography from "@components/Typography";
import type { FunctionComponent } from "preact";

type TCollectionGroup = {
  title?: string;
  link?: string;
  linkText?: string;
};
const CollectionGroup: FunctionComponent<TCollectionGroup> = ({
  title,
  children,
  link,
  linkText,
}) => {
  return (
    <div className="collection-group">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6  lg:max-w-7xl lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-12 sm:mb-0">
          <Typography tag="h2" size="h5/bold" className=" tracking-tight">
            {title}
          </Typography>
          {link ? (
            <a
              href={link}
              className="hidden text-sm font-medium text-app-primary-600 hover:text-app-primary-500 md:block"
            >
              {linkText}
              <span aria-hidden="true"> &rarr;</span>
            </a>
          ) : null}
        </div>
        {children}
        {link ? (
          <div className="mt-8 text-sm md:hidden">
            <a
              href={link}
              className="font-medium text-app-primary-600 hover:text-app-primary-500"
            >
              {linkText}
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CollectionGroup;
