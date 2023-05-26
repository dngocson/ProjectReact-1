import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  ///////////// Cart
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  changed: false,
  backupCart: {},
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemtoCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.totalAmount += newItem.price;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
          image: newItem.image,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload.id;
      state.totalQuantity--;
      state.totalAmount -= action.payload.price;
      state.changed = true;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
    removeAllQuantityFromCart(state, action) {
      const id = action.payload.id;
      state.totalQuantity -= action.payload.quantity;
      state.totalAmount -= action.payload.total;
      state.items = state.items.filter((item) => item.id !== id);
    },
    clearCart(state, action) {
      const newState = {
        ...initialState,
        changed: true,
      };
      return newState;
    },
    resumeCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalAmount = action.payload.totalAmount;
    },
    backupExistingCart(state, action) {
      state.backupCart = {
        items: state.items,
        totalQuantity: state.totalQuantity,
        totalAmount: state.totalAmount,
      };
    },
  },
});
export const cartActions = cartSlice.actions;
export default cartSlice;
