import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { useDispatch } from "react-redux";
import { updateOrderList } from "../../store/cartDataFireStore";
import { cartActions } from "../../store/cart-slice";
import { uiActions } from "../../store/ui-slice";
import { getOrderListFromFirestore } from "../../store/cartDataFireStore";
import { BsArrowBarLeft } from "react-icons/bs";
import { useState } from "react";
const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const userAddress = useSelector((state) => state.ui.shippingInfo.address);
  const userPhoneNumber = useSelector(
    (state) => state.ui.shippingInfo.phoneNumber
  );
  const isAuth = useSelector((state) => state.ui.isAuth);
  // const [notification, setNotification] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddess] = useState("");
  const hasItems = cartItems.length > 0;
  const dispatch = useDispatch();
  const sendDataHandler = (e) => {
    e.preventDefault();
    // if (!isAuth) {
    //   setNotification("Please login before checking out");
    //   return;
    // }
    dispatch(updateOrderList());
    dispatch(cartActions.clearCart());
    dispatch(uiActions.setDisplayCart());
    dispatch(getOrderListFromFirestore());
  };
  const continueShopping = () => {
    dispatch(uiActions.setDisplayCart());
    navigate("/");
  };
  // const loginHandler = () => {
  //   navigate("/auth?mode=signup");
  //   dispatch(uiActions.setDisplayCart());
  // };
  const inputAddressHandler = (address) => {
    setAddess(address);
    dispatch(uiActions.setShippingAddress({ address, phoneNumber }));
  };
  const inputPhoneNumberHandler = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
    dispatch(uiActions.setShippingAddress({ phoneNumber, address }));
  };
  return (
    <div className="fixed z-30 h-5/6 w-2/3 bg-[#ffffff] top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-2xl grid-rows-4 grid grid-cols-7">
      <div className="col-span-5 row-span-3">
        <div className="flex p-4 justify-between  items-center border-b">
          <h2>Shopping Cart</h2>
          <h2>{totalQuantity} items</h2>
        </div>
        <div className="grid grid-cols-5 text-center border-b ">
          <p className="col-span-2">PRODUCTS DETAILS</p>
          <p className="col-span-1">QUANTITY</p>
          <p className="col-span-1">PRICE</p>
          <p className="col-span-1">TOTAL</p>
        </div>
        <div className="overflow-x-hidden max-h-[32rem] ">
          <ul className="">
            {hasItems ? (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={{
                    id: item.id,
                    title: item.title,
                    quantity: item.quantity,
                    total: item.totalPrice,
                    price: item.price,
                    image: item.image,
                  }}
                />
              ))
            ) : (
              <p className="p-4">
                It looks like your cart is empty. Let’s add some items to it!
              </p>
            )}
          </ul>
        </div>
        <div className="m-7 text-[#6467d8]">
          <button
            className="flex justify-center items-center"
            onClick={continueShopping}
          >
            <BsArrowBarLeft />
            Continue shoppping
          </button>
        </div>
      </div>
      <div className="col-span-2 flex flex-col bg-[#f6f6f6] h-full row-span-4">
        <div className="p-4 border-b">
          <h2>Order Summary</h2>
        </div>
        <div className="flex justify-between w-full px-4">
          <h3>{totalQuantity} Item</h3>
          <h3>{totalPrice.toFixed(2)}$</h3>
        </div>
        <div className="pt-6 px-4">
          <p className="text-xl">SHIPPING</p>
          <p className="text-base">Please input your information</p>
          <p className="text-base">Address:</p>
          <form onSubmit={sendDataHandler} className="flex flex-col">
            <textarea
              type="text"
              required
              placeholder="Your address"
              className="w-full placeholder:text-base focus:ring-0 focus:outline-none"
              rows={4}
              spellCheck={false}
              onChange={(e) => inputAddressHandler(e.target.value)}
              defaultValue={userAddress}
            ></textarea>
            <p className="text-base">Phone number:</p>
            <textarea
              placeholder="Phone number"
              onChange={(e) => inputPhoneNumberHandler(e.target.value)}
              required
              className="text-base w-full"
              defaultValue={userPhoneNumber}
            ></textarea>
            {hasItems ? (
              <button
                className="self-center mt-4 font-semibold bg-slate-400 hover:bg-indigo-600 duration-300 py-3 text-xl w-full"
                type="submit"
              >
                CHECK OUT
              </button>
            ) : (
              <></>
            )}
            {/* {notification && (
              <div>
                <p>{notification}</p>
                <button
                  className="self-center mt-4 font-semibold bg-slate-400 hover:bg-indigo-600 duration-300 py-3 text-xl w-full"
                  onClick={loginHandler}
                >
                  LOGIN
                </button>
              </div>
            )} */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
