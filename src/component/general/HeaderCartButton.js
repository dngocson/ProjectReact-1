import { BiCart } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { useSelector } from "react-redux";
const HeaderCartButton = (props) => {
  const dispatch = useDispatch();
  const totalProduct = useSelector((state) => state.cart.totalQuantity);
  const displayCart = () => {
    dispatch(uiActions.setDisplayCart());
  };
  return (
    <div className="flex items-center justify-center rounded-full p-1 transition duration-300 dark:bg-slate-500 dark:hover:bg-slate-400 md:rounded-lg">
      <button onClick={displayCart} className="ns_center ">
        <BiCart className="text-2xl md:text-3xl" />
        <span className="hidden rounded-full bg-orange-400 px-2 text-lg md:block">
          {totalProduct}
        </span>
      </button>
    </div>
  );
};

export default HeaderCartButton;
