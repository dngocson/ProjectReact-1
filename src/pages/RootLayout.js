import Header from "../component/general/Header";
import Footer from "../component/general/Footer";
import { Outlet } from "react-router-dom";
import Popup from "../component/general/Popup";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AiOutlineToTop } from "react-icons/ai";
function RootLayout() {
  const cartIsDisplay = useSelector((state) => state.ui.displayCart);
  /////////////// Back to top
  const [toTopButton, setToTopButton] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setToTopButton(true);
      } else {
        setToTopButton(false);
      }
    });
  }, []);
  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className=" flex flex-col gap-4 rounded-none bg-sky-100 p-2 dark:bg-slate-900 dark:text-slate-50 md:rounded-2xl md:p-4">
      {cartIsDisplay && <Popup />}
      <Header />
      <Outlet />
      <Footer />
      {toTopButton && (
        <button
          onClick={toTop}
          className="fixed bottom-9 right-9 z-20 rounded-full bg-blue-500 p-2 text-xl dark:bg-white dark:text-black md:text-3xl"
        >
          <AiOutlineToTop />
        </button>
      )}
    </div>
  );
}
export default RootLayout;
