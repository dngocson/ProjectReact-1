import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { ToastContainer, toast } from "react-toastify";
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
    <div className="flex h-full flex-col items-center justify-between rounded-2xl border border-gray-200  shadow dark:border-gray-700 dark:bg-gray-800 ">
      <NavLink to={`/product/detail/${id}`}>
        <img
          className="h-72 w-72 transform p-4 duration-300 hover:scale-105"
          src={image}
          alt="product image"
        />
      </NavLink>
      <div className="flex h-full w-full flex-col px-5 pb-5">
        <h5 className="text-base font-semibold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <div className="flex h-full items-end justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ${price}
          </span>
          <button
            onClick={addItemtoCart}
            className="whitespace-nowrap rounded-lg bg-blue-700 p-2 px-5 text-center text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:py-2.5"
          >
            Add to cart
          </button>
        </div>
      </div>
      <ToastContainer autoClose={300} limit={3} />
    </div>
  );
};

export default Product;
