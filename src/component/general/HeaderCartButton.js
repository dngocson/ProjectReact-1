import { BiCart } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const HeaderCartButton = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalProduct = useSelector((state) => state.cart.totalQuantity);
  const isAuth = useSelector((state) => state.ui.isAuth);
  const displayCart = () => {
    if (!isAuth) {
      navigate("/auth?mode=signup");
      return;
    }
    dispatch(uiActions.setDisplayCart());
  };
  return (
    <div className="flex items-center justify-center rounded-full bg-sky-300 p-1 transition duration-300 hover:bg-sky-500 dark:bg-slate-500 dark:hover:bg-slate-400 md:rounded-lg">
      <button onClick={displayCart} className="ns_center ">
        <BiCart className="text-2xl md:text-3xl" />
        <span className="hidden rounded-full bg-yellow-400 px-2 text-lg dark:bg-orange-400 md:block">
          {totalProduct}
        </span>
      </button>
    </div>
  );
};

export default HeaderCartButton;
