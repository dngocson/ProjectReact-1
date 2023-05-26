import { createSlice } from "@reduxjs/toolkit";
const shopItemSlice = createSlice({
  name: "fetchShopItem",
  initialState: { shopItem: [] },
  reducers: {
    fetchShopItem(state, action) {
      state.shopItem = action.payload;
    },
  },
});
export const shopItemActions = shopItemSlice.actions;
export default shopItemSlice;
