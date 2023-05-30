import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "uiSlice",
  initialState: {
    displayCart: false,
    isAuth: false,
    uid: null,
    orderList: [],
    shippingInfo: { address: "", phoneNumber: "", city: "", district: "" },
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
      const city = action.payload.city || "";
      const district = action.payload.district || "";
      state.shippingInfo = {
        ...oldState,
        phoneNumber,
        address,
        city,
        district,
      };
    },
    clearShippingAddress(state, action) {
      state.shippingInfo = {
        phoneNumber: "",
        address: "",
        city: "",
        district: "",
      };
    },
    resumeShippingInfo(state, action) {
      state.shippingInfo = action.payload;
    },
  },
});
export const uiActions = uiSlice.actions;
export default uiSlice;
