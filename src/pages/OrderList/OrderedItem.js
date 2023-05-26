import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const OrderedItem = ({ item, index }) => {
  const dispatch = useDispatch();
  const buyAgaiHandler = ({ id, price, title, image }) => {
    toast.success("Item added to cart", { theme: "colored" });
    dispatch(cartActions.addItemtoCart({ id, price, title, image }));
  };
  return (
    <li className="pt-4">
      <div className="grid grid-cols-7 gap-2 bg-white rounded-xl overflow-hidden">
        <div className="flex flex-col col-span-2">
          <Link
            to={`/product/detail/${item.id}`}
            className="flex gap-3 items-center "
          >
            <img src={item.image} className="w-[40%] aspect-square"></img>
            <p>{item.title}</p>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <p>{item.quantity}</p>
        </div>
        <div className="flex justify-center items-center">
          <p>{item.price}$</p>
        </div>
        <div className="flex justify-center items-center">
          <p>{item.totalPrice}$</p>
        </div>
        <div className="">
          <div className="flex justify-center items-center h-full ">
            <div className="flex flex-col">
              <button
                className="m-2 p-2 bg-[#64748b] rounded-xl hover:bg-indigo-600 duration-300"
                onClick={() =>
                  buyAgaiHandler({
                    id: item.id,
                    price: item.price,
                    title: item.title,
                    image: item.image,
                  })
                }
              >
                Buy again
              </button>
              <Link
                className="m-2 p-2  bg-[#64748b] rounded-xl hover:bg-indigo-600 duration-300"
                to={`/product/detail/${item.id}`}
              >
                View Product
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} limit={3} />
    </li>
  );
};

export default OrderedItem;
