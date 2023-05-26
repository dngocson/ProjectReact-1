import { shopItemActions } from "./shopItem-slice";

export const fetchShopItem = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products?limit=100"
      );

      if (!response.ok) {
        throw new Error("Could not get shop data!");
      }

      const data = await response.json();
      dispatch(shopItemActions.fetchShopItem(data));
    } catch (error) {
      console.error(error);
    }
  };
};
