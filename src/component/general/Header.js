import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";

import ImageSlider from "./ImageSlider";
import SearchBar from "./SearchBar";
import Navigation from "./Navigation";
import HeaderCartButton from "./HeaderCartButton";

import { cartActions } from "../../store/cart-slice";
import { uiActions } from "../../store/ui-slice";

import { BsFillMoonStarsFill, BsFillSunFill, BsListUl } from "react-icons/bs";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";

import { getAuth } from "firebase/auth";

function Header() {
  const dispatch = useDispatch();
  const auth = getAuth();

  const setDisplayNavHandler = () => {
    dispatch(uiActions.setDisplaynav());
  };
  const user = auth.currentUser;
  let displayTest = "";
  if (user) {
    let username = user.displayName;
    if (username === null) username = "";
    displayTest = `Wellcome ${username}`;
  } else {
    displayTest = `Let's Sign In`;
  }
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.ui.isAuth);
  const [darkMode, setDarkMode] = useState(undefined);
  const switchDarkMode = () => {
    setDarkMode(!darkMode);
    dispatch(uiActions.setChangeMode());
  };
  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("darkMode", "true");
      window.document.documentElement.classList.add("dark");
    } else if (darkMode === false) {
      localStorage.setItem("darkMode", "false");
      window.document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(localStorage.getItem("darkMode") === "true");
    }
  }, [darkMode]);
  const signOutHandler = async () => {
    try {
      if (window.confirm("Do you really want to leave?")) {
        await signOut(auth);
        dispatch(cartActions.clearCart());
        dispatch(uiActions.setOrderlist(null));
        dispatch(uiActions.clearShippingAddress());
        navigate("/auth?mode=login");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <header className="z-1">
        <div className="flex items-center justify-between gap-2 py-2">
          <Link
            to={"/"}
            className=" text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl md:font-bold"
          >
            MyShop
          </Link>
          <SearchBar />
          <div className=" ns_center gap-2 ">
            <HeaderCartButton />
            <div
              className=" rounded-full bg-sky-300  p-2 transition duration-300 hover:bg-sky-500 dark:bg-slate-500 dark:hover:bg-slate-400"
              onClick={switchDarkMode}
            >
              {!darkMode ? (
                <BsFillMoonStarsFill className="ns_headerIcon" />
              ) : (
                <BsFillSunFill className="ns_headerIcon" />
              )}
            </div>
            <p className="hidden dark:text-white  md:block">{displayTest}</p>
            <div className="md:hidden">
              <button
                onClick={setDisplayNavHandler}
                className="ns_center rounded-full bg-sky-300 p-2 transition duration-300 hover:bg-sky-500  dark:bg-slate-500 dark:hover:bg-slate-400 "
              >
                <BsListUl className="ns_headerIcon " />
              </button>
            </div>
            <div className="ns_center rounded-full bg-sky-300 p-2 transition duration-300 hover:bg-sky-500 dark:bg-slate-500 dark:hover:bg-slate-400">
              {!isAuth && (
                <Link className="" to={"auth?mode=signup"}>
                  <AiOutlineLogin className="ns_headerIcon" />
                </Link>
              )}
              {isAuth && (
                <button onClick={signOutHandler}>
                  <AiOutlineLogout className="ns_headerIcon" />
                </button>
              )}
            </div>
          </div>
        </div>
        <Navigation />
        <div>
          <ImageSlider />
        </div>
      </header>
    </div>
  );
}
export default Header;
