import ProductCard from "@components/ProductCard";
import Typography from "@components/Typography";
import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import type { Product } from "@store/productStore";
import type { FunctionComponent } from "preact";

type TProductCards = {
  products: Product[];
};
const ProductCards: FunctionComponent<TProductCards> = ({ products }) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 justify-center sm:justify-normal xs:grid-cols-2 sm:grid-cols-3">
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
};

export default ProductCards;
