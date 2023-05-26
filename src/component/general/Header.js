import { Fragment } from "react";
import ImageSlider from "./ImageSlider";
import SearchBar from "./SearchBar";
import Navigation from "./Navigation";
import HeaderCartButton from "./HeaderCartButton";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { firebaseAuth as auth } from "../../config/firebase";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { cartActions } from "../../store/cart-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uiActions } from "../../store/ui-slice";
import GenericButton from "../UI/GenericButton";
const cookies = new Cookies();
function Header() {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.ui.isAuth);
  const dispatch = useDispatch();
  const signOutHandler = async () => {
    try {
      if (window.confirm("Do you really want to leave?")) {
        await signOut(auth);
        cookies.remove("auth-token");
        dispatch(cartActions.clearCart());
        dispatch(uiActions.setOrderlist(null));
        navigate("/auth");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Fragment>
      <header className="z-1">
        <div className="pt-5">
          <div className="flex justify-between">
            <Link
              to={"/"}
              className="mb-2 mt-0 text-4xl font-medium leading-tight text-primary"
            >
              MyShop
            </Link>
            <SearchBar />
            <div className="flex gap-10 justify-center items-center ">
              <HeaderCartButton />
              {!isAuth && (
                <Link
                  className="text-xl  p-2 duration-300 hover:bg-blue-600 rounded-xl "
                  to={"auth?mode=signup"}
                >
                  LOGIN
                </Link>
              )}
              {isAuth && (
                <GenericButton onClick={signOutHandler}>Sign Out</GenericButton>
              )}
            </div>
          </div>
          <Navigation />
        </div>
        <div>
          <ImageSlider />
        </div>
      </header>
    </Fragment>
  );
}
export default Header;
