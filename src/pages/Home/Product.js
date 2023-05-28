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
      navigate("auth?mode=signup");
      return;
    }
    toast.success("Item added to cart", { theme: "colored" });
    dispatch(cartActions.addItemtoCart({ id, price, title, image }));
  };
  return (
    <div className="w-full max-w-sm h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between ">
      <NavLink to={`/product/detail/${id}`}>
        <img
          className="p-6 h-96 w-full transform hover:scale-105 duration-300"
          src={image}
          alt="product image"
        />
      </NavLink>
      <div className="px-5 pb-5 flex flex-col w-full h-full">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <div className="flex  justify-between h-full items-end">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${price}
          </span>
          <button
            onClick={addItemtoCart}
            className="text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
