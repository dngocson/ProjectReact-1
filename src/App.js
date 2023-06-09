import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import About from "./pages/About";
import Authentication, { action as authAction } from "./pages/Authentication";
import RootLayout from "./pages/RootLayout";
import OrderedList from "./pages/OrderList/OrderedList";
import ProductDetail from "./pages/ProductDetail";
import "./App.css";
import { useEffect } from "react";
import { fetchShopItem } from "./store/fetchShopItem-action";
import { resumeAuthstate } from "./store/resumeAuth-action";
import { useDispatch, useSelector } from "react-redux";
import {
  sendCartDataToFireStore,
  getCartDataFromFireStore,
  getOrderListFromFirestore,
} from "./store/cartDataFireStore";
import ErrorPage from "./pages/Error";
import LandingPage from "./pages/LandingPage/LandingPage";
let isInitial = true;
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/allProduct",
        element: <HomePage />,
      },
      {
        path: "product/detail/:productId",
        element: <ProductDetail />,
      },
      {
        path: "auth",
        element: <Authentication />,
        action: authAction,
      },
      {
        path: "Ordered",
        element: <OrderedList />,
        // action: authAction,
      },
    ],
  },
]);
function App() {
  ////////////////// Get shop Item
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchShopItem());
    dispatch(resumeAuthstate());
  }, [dispatch]);
  ///////////////// Send cart data to Firestore
  const cart = useSelector((state) => state.cart);
  const ui = useSelector((state) => state.ui);
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed || ui) {
      dispatch(sendCartDataToFireStore());
    }
  }, [cart, dispatch, ui]);
  /////////////////// Get cart data from Firestore
  const userLogin = useSelector((state) => state.ui.isAuth);
  useEffect(() => {
    dispatch(getCartDataFromFireStore());
    dispatch(getOrderListFromFirestore());
  }, [userLogin, dispatch]);
  ///////////////////// Get Order history from FireStore
  return <RouterProvider router={router} />;
}
export default App;
