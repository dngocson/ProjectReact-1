import Header from "../component/general/Header";
import Footer from "../component/general/Footer";
import { Outlet } from "react-router-dom";
import Popup from "../component/general/Popup";
import { useSelector } from "react-redux";
function RootLayout() {
  const cartIsDisplay = useSelector((state) => state.ui.displayCart);
  return (
    <div className="">
      <div className=" bg-sky-100 p-4 dark:bg-slate-900 dark:text-red-700">
        {cartIsDisplay && <Popup />}
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
export default RootLayout;
