import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom/dist";
import "react-toastify/dist/ReactToastify.css";
const Product = ({ title, price, id, image }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.ui.isAuth);
  const addItemtoCart = () => {
    if (!isAuth) {
      navigate("/auth?mode=signup");
      return;
    }
    toast.success("Item added to cart", { theme: "colored" });
    dispatch(cartActions.addItemtoCart({ id, price, title, image }));
  };
  return (
    <div className="flex h-full w-full max-w-sm flex-col justify-between rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800 ">
      <NavLink to={`/product/detail/${id}`}>
        <img
          className="h-96 w-full transform p-6 duration-300 hover:scale-105"
          src={image}
          alt="product image"
        />
      </NavLink>
      <div className="flex h-full w-full flex-col px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <div className="flex  h-full items-end justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${price}
          </span>
          <button
            onClick={addItemtoCart}
            className="rounded-lg bg-blue-700 px-5   py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to cart
          </button>
        </div>
      </div>
      <ToastContainer autoClose={1000} limit={3} />
    </div>
  );
};

export default Product;
