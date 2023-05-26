import Header from "../component/general/Header";
import Footer from "../component/general/Footer";
import { Outlet } from "react-router-dom";
import Popup from "../component/general/Popup";
import { useSelector } from "react-redux";
function RootLayout() {
  const cartIsDisplay = useSelector((state) => state.ui.displayCart);
  return (
    <div className="">
      {cartIsDisplay && <Popup />}
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
export default RootLayout;
