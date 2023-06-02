import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderedItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [totalPrice, setTotalPrice] = useState(item.price * quantity);

  const dispatch = useDispatch();

  const buyAgainHandler = () => {
    toast.success("Item added to cart", { theme: "colored" });
    dispatch(
      cartActions.addItemtoCart({
        id: item.id,
        price: item.price,
        title: item.title,
        image: item.image,
      })
    );
  };

  useEffect(() => {
    setQuantity(item.quantity);
    setTotalPrice(item.price * quantity);
  }, [item]);

  return (
    <li className=" pt-1 text-xs md:pt-4 md:text-2xl">
      <div className="grid grid-cols-5 gap-2 overflow-hidden rounded-xl bg-white dark:bg-zinc-700 sm:grid-cols-7">
        <div className="col-span-2 flex flex-col">
          <Link
            to={`/product/detail/${item.id}`}
            className="flex items-center gap-1 md:gap-3 md:text-lg"
          >
            <img
              src={item.image}
              className="aspect-square w-[40%]"
              alt={item.id}
            ></img>
            <p>{item.title}</p>
          </Link>
        </div>
        <div className="flex items-center justify-center md:text-lg">
          <p>{quantity}</p>
        </div>
        <div className="flex items-center justify-center md:text-lg">
          <p>{item.price}$</p>
        </div>
        <div className="flex items-center justify-center md:text-lg">
          <p>{totalPrice}$</p>
        </div>
        <div className="col-span-2 hidden h-full flex-col items-center justify-center sm:flex lg:col-span-1">
          <button
            className=" m-1 w-full self-end rounded-xl bg-[#64748b]
             p-1  duration-300 hover:bg-indigo-600 md:m-2 md:p-2 
             md:text-base"
            onClick={buyAgainHandler}
          >
            Buy again
          </button>
          <Link
            className=" m-1 flex w-full items-center justify-center self-end rounded-xl bg-[#64748b] p-1 
             duration-300 hover:bg-indigo-600 md:m-2 md:p-2 md:text-base"
            to={`/product/detail/${item.id}`}
          >
            <span>View Product</span>
          </Link>
        </div>
      </div>
      <ToastContainer autoClose={1000} limit={3} />
    </li>
  );
};

export default OrderedItem;
