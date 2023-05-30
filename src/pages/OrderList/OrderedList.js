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
  const data = useSelector((state) => state.ui.orderList);
  const isAuth = useSelector((state) => state.ui.isAuth);
  let renderedList;
  if (!isAuth) {
    return (
      <div className="text-2xl">
        <p>
          This feature is only available after you have logged in and placed an
          order.
        </p>
        <p>
          If you already have an account, please click the button below to sign
          in.
        </p>
        <Link
          className="m-2 inline-block rounded-2xl bg-gray-600 p-2 duration-300 hover:bg-indigo-600"
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
    <div>
      <h3>Order History</h3>
      <p>
        Thank you for choosing to shop with us and for your continued support.
        Here is a list of your completed orders
      </p>

      <ul>
        {renderedList.map((order, index) => (
          <li key={index} className="my-5 rounded-xl bg-slate-500 p-4">
            <div className="">
              <div className="">
                <p className="text-2xl text-white">
                  Order number: #{index + 1}, placed on{" "}
                  {formatDate(order.createAt)}
                </p>
              </div>
              <div className="grid grid-cols-7 p-4 text-center text-xl text-white">
                <p className="col-span-2">PRODUCTS DETAILS</p>
                <p>QUANTITY</p>
                <p>PRICE</p>
                <p>TOTAL</p>
                <p>INFOR</p>
              </div>
              <ul>
                {order.items.map((item, index) => (
                  <OrderedItem key={index} item={item} index={index + 1} />
                ))}
              </ul>
              <div className="mt-3 rounded-xl bg-white p-4 text-xl">
                <p className="text-2xl">
                  Total : {order.totalQuantity} items -{" "}
                  {order.totalAmount.toFixed(2)}$
                </p>
                <p>
                  Shipping address: {order.shippingInfo.address},
                  {order.shippingInfo.district},{order.shippingInfo.city} city,
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
