import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import type { FunctionComponent } from "preact";
import ProductContainerCard from "./ProductContainerCard";

type TProductContainer = {
  products: PricedProduct[];
};
const ProductContainer: FunctionComponent<TProductContainer> = ({
  products,
}) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 gap-y-12 justify-center sm:justify-normal xs:grid-cols-2 sm:grid-cols-3">
      {products.map((product) => (
        <ProductContainerCard product={product} />
      ))}
    </div>
  );
};

export default ProductContainer;
