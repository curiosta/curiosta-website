import medusa from "@api/medusa";
import user from "@api/user";

const getCart = async (cart_id: string) => {
  return medusa.carts.retrieve(cart_id);
};

export default getCart;
