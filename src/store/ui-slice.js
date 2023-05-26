import { createSlice } from "@reduxjs/toolkit";
const uiSlice = createSlice({
  name: "uiSlice",
  initialState: { displayCart: false, isAuth: false, uid: null, orderList: [] },
  reducers: {
    setDisplayCart(state, action) {
      state.displayCart = !state.displayCart;
    },
    checkUserLogin(state, action) {
      state.isAuth = action.payload;
    },
    saveUid(state, action) {
      state.uid = action.payload;
    },
    setOrderlist(state, action) {
      state.orderList = action.payload;
    },
  },
});
export const uiActions = uiSlice.actions;
export default uiSlice;
