import Card from "@components/Card";

interface Props {
  products: {
    title: string;
    thumbnail: string;
    description: string;
    id: string;
    variants: {
      id: string;
      title: string;
      prices: {
        currency_code: string;
        amount: number;
      }[];
    }[];
  }[];
  page: "Homepage" | "Productpage";
}

const ProductSection = ({ products, page }: Props) => {
  return (
    <div class="mx-auto  px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="md:flex md:items-center md:justify-between">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">
          Trending products
        </h2>
        <a
          href="/products"
          class={`hidden text-sm font-medium text-indigo-600 hover:text-indigo-500  ${page !== "Homepage" ? "md:hidden" : "md:block"
            }`}
        >
          View all product
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>

      <div
        class={`mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 ${page !== "Homepage" ? "md:grid-cols-4" : "md:grid-cols-3"
          }  lg:gap-x-8`}
      >
        {products.map((product) => (
          <Card
            id={product.id}
            imageSrc={product.thumbnail}
            title={product.title}
            shortDescription={product.description}
            variants={product.variants}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
