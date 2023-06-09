import { useSelector } from "react-redux";
import OrderedItem from "./OrderedItem";
import { Link } from "react-router-dom";
const formatDate = (dateString) => {
  if (dateString === null) {
    return "Pending";
  } else {
    let date_object = new Date(dateString);
    let options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return date_object.toLocaleString("en-US", options);
  }
};

const OrderedList = () => {
  localStorage.setItem("redirectUrl", window.location.href);
  const data = useSelector((state) => state.ui.orderList);
  const isAuth = useSelector((state) => state.ui.isAuth);
  let renderedList;
  if (!isAuth) {
    return (
      <div className="text-base md:text-2xl">
        <p>
          This feature is only available after you have logged in and placed an
          order.
        </p>
        <p>
          If you already have an account, please click the button below to sign
          in.
        </p>
        <Link
          className="m-2 inline-block rounded-2xl bg-blue-700 p-2 duration-300 hover:bg-blue-500 dark:bg-gray-600 dark:hover:bg-indigo-600"
          to={"/auth?mode=signup"}
        >
          Click me
        </Link>
      </div>
    );
  }
  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  } else {
    renderedList = JSON.parse(data);
  }

  return (
    <div className="text-xs md:text-base">
      <h2>Order History</h2>
      <p className="my-2 text-sm md:text-xl">
        Thank you for choosing to shop with us and for your continued support.
        Here is a list of your completed orders
      </p>
      <ul>
        {renderedList.map((order, index) => (
          <li
            key={index}
            className="my-2 rounded-xl bg-blue-300 p-2 text-black dark:bg-slate-500 dark:text-white md:my-5 md:p-4"
          >
            <div className="">
              <p className="text-xs text-pink-600 dark:text-orange-300 md:text-2xl">
                Order number: #{index + 1}, placed on{" "}
                {formatDate(order.createAt)}
              </p>
              <div className="grid grid-cols-5 text-center text-xl text-black dark:text-white sm:grid-cols-7 md:p-4">
                <p className="col-span-2 text-xs md:text-2xl">
                  PRODUCTS DETAILS
                </p>
                <p className="text-xs md:text-2xl">QUANTITY</p>
                <p className="text-xs md:text-2xl">PRICE</p>
                <p className="text-xs md:text-2xl">TOTAL</p>
                <p className="col-span-2 hidden text-xs sm:block md:col-span-1 md:text-2xl">
                  INFOR
                </p>
              </div>
              <ul>
                {order.items.map((item, index) => (
                  <OrderedItem key={index} item={item} index={index + 1} />
                ))}
              </ul>
              <div className="mt-1 rounded-xl bg-emerald-200 p-2 text-xs text-black dark:bg-gray-700 dark:text-white md:mt-3 md:p-4 md:text-2xl">
                <p className="text-pink-600 dark:text-orange-300">
                  TOTAL : {order.totalQuantity} items -{" "}
                  {order.totalAmount.toFixed(2)}$
                </p>
                <p>
                  Shipping address: {order.shippingInfo.address},{" "}
                  {order.shippingInfo.district}, {order.shippingInfo.city} city,
                  VietNam
                </p>
                <p>Contact phone number: {order.shippingInfo.phoneNumber}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderedList;
