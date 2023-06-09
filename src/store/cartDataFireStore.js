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
    if (!state.ui.isAuth) return;
    const { totalAmount, totalQuantity } = state.cart;
    const cartItems = state.cart.items || [];
    const currentId = state.ui.uid;
    const q = query(cartCollection, where("uid", "==", currentId));
    const shippingAddress = state.ui.shippingInfo;
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        await addDoc(cartCollection, {
          items: cartItems,
          totalAmount: Number(totalAmount),
          totalQuantity,
          uid: currentId,
          shippingInfo: shippingAddress,
        });
      } else {
        querySnapshot.forEach((doc) => {
          updateDoc(doc.ref, {
            items: cartItems,
            totalAmount: Number(totalAmount),
            totalQuantity,
            uid: currentId,
            shippingInfo: shippingAddress,
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
      const { shippingInfo, items, totalAmount, totalQuantity } = responseData;
      dispatch(cartActions.resumeCart({ items, totalQuantity, totalAmount }));
      dispatch(uiActions.resumeShippingInfo(shippingInfo));
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
    const shippingInfo = state.ui.shippingInfo;
    try {
      await addDoc(orderListCollection, {
        items: cartItems,
        totalAmount: Number(totalAmount),
        totalQuantity,
        shippingInfo,
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
