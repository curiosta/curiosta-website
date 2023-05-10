import medusa from "@api/medusa";
import useLocalStorage from "src/hooks/useLocalStorage";

const getCart = async () => {
  const { get } = useLocalStorage();

  const cartId: string = get("cartId");
  if (!cartId) return null;
  await medusa.carts.retrieve(cartId);
};

export default getCart;
