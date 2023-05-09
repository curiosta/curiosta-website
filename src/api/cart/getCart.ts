import medusa from "@api/medusa";
import useLocalStorage from "src/hooks/useLocalStorage";

const getCart = async () => {
  const { get } = useLocalStorage();

  const cartId = get<string>("cartId");
  if (!cartId) return null;
  const result = await medusa.carts.retrieve(cartId);
  console.log(result, "res");
};

export default getCart;
