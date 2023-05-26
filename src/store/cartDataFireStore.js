import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";
const cartCollection = collection(db, "Cart");
export const sendCartDataToFireStore = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const { totalAmount, totalQuantity } = state.cart;
    const cartItems = state.cart.items || [];
    const currentId = state.ui.uid;
    const q = query(cartCollection, where("uid", "==", currentId));
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        await addDoc(cartCollection, {
          items: cartItems,
          totalAmount: Number(totalAmount),
          totalQuantity,
          uid: currentId,
        });
      } else {
        querySnapshot.forEach((doc) => {
          updateDoc(doc.ref, {
            items: cartItems,
            totalAmount: Number(totalAmount),
            totalQuantity,
            uid: currentId,
          });
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
};
export const getCartDataFromFireStore = () => {
  return async (dispatch, getState) => {
    const state = getState();
    if (!state.ui.isAuth) return;
    const currentId = state.ui.uid;
    const q = query(cartCollection, where("uid", "==", currentId));
    try {
      const querySnapshot = await getDocs(q);
      const [responseData] = querySnapshot.docs.map((doc) => doc.data());
      let { items, totalAmount, totalQuantity } = responseData;
      // const {  backupItems, backupTotalAmout, backupTotalQuantity } =
      //   state.cart.backupCart;
      ////////////////////////////////// Get backup Cart
      const backupItems = state.cart.backupCart.items || [];
      const backupTotalAmout = state.cart.backupCart.totalAmount || 0;
      const backupTotalQuantity = state.cart.backupCart.totalQuantity || 0;

      //////////////////////////////// Combine Cart
      const newItem = backupItems.concat(items);
      items = newItem;
      totalQuantity = totalQuantity + backupTotalQuantity;
      totalAmount = totalAmount + backupTotalAmout;

      ///////////////////////////////
      console.log(backupItems, backupTotalAmout, backupTotalQuantity);
      console.log(items, totalQuantity, totalAmount);
      // console.log(state.cart.backupCart);
      dispatch(cartActions.resumeCart({ items, totalQuantity, totalAmount }));
      // dispatch(cartActions.resumeCart({ backupItems, backupTotalAmout, backupTotalQuantity }));
    } catch (err) {
      console.error(err);
    }
  };
};

///////////////////// Order List
const orderListCollection = collection(db, "OrderList");
///////////////////// Send
export const updateOrderList = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const { totalAmount, totalQuantity } = state.cart;
    const cartItems = state.cart.items || [];
    const currentId = state.ui.uid;
    const { address, phoneNumber } = state.ui.shippingInfo;
    try {
      await addDoc(orderListCollection, {
        items: cartItems,
        totalAmount: Number(totalAmount),
        totalQuantity,
        address: address,
        phoneNumber: phoneNumber,
        uid: currentId,
        createAt: serverTimestamp(),
      });
    } catch (err) {
      console.error(err);
    }
  };
};
//////////////////// Get
export const getOrderListFromFirestore = () => {
  return async (dispatch, getState) => {
    const state = getState();
    if (!state.ui.isAuth) return;
    const currentId = state.ui.uid;
    const q = query(
      orderListCollection,
      where("uid", "==", currentId),
      orderBy("createAt", "desc")
    );
    try {
      setTimeout(async () => {
        const querySnapshot = await getDocs(q);
        const responseData = querySnapshot.docs.map((doc) => doc.data());
        const transformedArray = responseData.map((obj) => {
          const timeStamp =
            obj.createAt?.seconds * 1000 + obj.createAt?.nanoseconds / 1000000;
          const myDate = new Date(timeStamp);
          const transformedObj = {
            ...obj,
            createAt: myDate,
          };
          return transformedObj;
        });
        dispatch(uiActions.setOrderlist(JSON.stringify(transformedArray)));
      }, 700);
    } catch (err) {
      console.error(err);
    }
  };
};
