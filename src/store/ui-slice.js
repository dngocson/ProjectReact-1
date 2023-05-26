import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "uiSlice",
  initialState: {
    displayCart: false,
    isAuth: false,
    uid: null,
    orderList: [],
    shippingInfo: { address: "", phoneNumber: "" },
  },
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
    setShippingAddress(state, action) {
      const oldState = state.shippingInfo;
      const phoneNumber = action.payload.phoneNumber;
      const address = action.payload.address;
      state.shippingInfo = { ...oldState, phoneNumber, address };
    },
    clearShippingAddress(state, action) {
      state.shippingInfo = { phoneNumber: "", address: "" };
    },
  },
});
export const uiActions = uiSlice.actions;
export default uiSlice;
