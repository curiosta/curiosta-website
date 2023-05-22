import Card from "@components/Card";
import Typography from "@components/Typography";
import type { Product } from "@api/product/index.d";

interface Props {
  products: Product[];
  page: "Homepage" | "Productpage";
}

const ProductContainer = ({ products, page }: Props) => {
  return (
    <div
      class={`mx-auto  px-4 ${
        page === "Productpage" ? "p-0" : "py-16"
      } sm:px-6 lg:max-w-7xl lg:px-8`}
    >
      <div class="md:flex md:items-center md:justify-between">
        <Typography
          tag="h5"
          size="h5/bold"
          variant="primary"
          className=" mt-4 tracking-tigh"
        >
          {page === "Homepage" ? "Feature products" : "Products"}
        </Typography>
        <a
          href="/products"
          class={`hidden text-sm font-medium text-indigo-600 hover:text-indigo-500  ${
            page !== "Homepage" ? "md:hidden" : "md:block"
          }`}
        >
          View all product
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>

      <div
        class={`mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:gap-x-8`}
      >
        {products.length
          ? products.map((product) => (
              <Card
                id={product.id}
                thumbnail={product.thumbnail}
                title={product.title}
                description={product.description}
                variants={product.variants}
              />
            ))
          : "Product not available"}
      </div>
    </div>
  );
};

export default ProductContainer;
