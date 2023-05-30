import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const OrderedItem = ({ item }) => {
  const dispatch = useDispatch();
  const buyAgaiHandler = ({ id, price, title, image }) => {
    toast.success("Item added to cart", { theme: "colored" });
    dispatch(cartActions.addItemtoCart({ id, price, title, image }));
  };
  return (
    <li className="pt-4">
      <div className="grid grid-cols-7 gap-2 overflow-hidden rounded-xl bg-white">
        <div className="col-span-2 flex flex-col">
          <Link
            to={`/product/detail/${item.id}`}
            className="flex items-center gap-3 "
          >
            <img src={item.image} className="aspect-square w-[40%]"></img>
            <p>{item.title}</p>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <p>{item.quantity}</p>
        </div>
        <div className="flex items-center justify-center">
          <p>{item.price}$</p>
        </div>
        <div className="flex items-center justify-center">
          <p>{item.totalPrice}$</p>
        </div>
        <div className="">
          <div className="flex h-full items-center justify-center ">
            <div className="flex flex-col">
              <button
                className="m-2 rounded-xl bg-[#64748b] p-2 duration-300 hover:bg-indigo-600"
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
                className="m-2 rounded-xl  bg-[#64748b] p-2 duration-300 hover:bg-indigo-600"
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
