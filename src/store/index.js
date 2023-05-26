import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import uiSlice from "./ui-slice";
import shopItemSlice from "./shopItem-slice";
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    shop: shopItemSlice.reducer,
    ui: uiSlice.reducer,
  },
});
export default store;
