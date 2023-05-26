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
    <>
      <button
        className="flex items-center justify-center w-[80px] gap-1 bg-slate-500 rounded-lg"
        onClick={displayCart}
      >
        <BiCart size={30} />
        <span className="p-1 text-lg">{totalProduct}</span>
      </button>
    </>
  );
};

export default HeaderCartButton;
