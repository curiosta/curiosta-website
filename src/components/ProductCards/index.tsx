import ProductCard from "@components/ProductCard";
import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import type { FunctionComponent } from "preact";

type TProductCards = {
  products: PricedProduct[];
}
const ProductCards: FunctionComponent<TProductCards> = ({ products }) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 justify-center sm:justify-normal xs:grid-cols-2 sm:grid-cols-3">
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  )
}

export default ProductCards