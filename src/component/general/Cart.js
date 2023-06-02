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
import CityDistrictForm from "./CityDistrictForm";
const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const userAddress = useSelector((state) => state.ui.shippingInfo.address);
  const city = useSelector((state) => state.ui.shippingInfo.city);
  const district = useSelector((state) => state.ui.shippingInfo.district);
  const userPhoneNumber = useSelector(
    (state) => state.ui.shippingInfo.phoneNumber
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddess] = useState("");
  const hasItems = cartItems.length > 0;
  const dispatch = useDispatch();
  const sendDataHandler = (e) => {
    e.preventDefault();
    dispatch(updateOrderList());
    dispatch(cartActions.clearCart());
    dispatch(uiActions.setDisplayCart());
    dispatch(getOrderListFromFirestore());
    navigate("/Ordered");
  };
  const continueShopping = () => {
    dispatch(uiActions.setDisplayCart());
    navigate("/allProduct");
  };
  const inputAddressHandler = (address) => {
    setAddess(address);
    dispatch(
      uiActions.setShippingAddress({ address, phoneNumber, city, district })
    );
  };
  const inputPhoneNumberHandler = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
    dispatch(
      uiActions.setShippingAddress({ phoneNumber, address, city, district })
    );
  };
  return (
    <div className="fixed left-[50%] top-[50%] z-40 grid h-full w-full -translate-x-1/2 -translate-y-1/2 transform grid-cols-5 grid-rows-4 overflow-scroll bg-white text-2xl md:grid-cols-7 xl:h-5/6 xl:w-2/3">
      <div className="col-span-5 row-span-3">
        <div className="flex items-center justify-between border-b p-4">
          <p className="text-base md:text-2xl">Shopping Cart</p>
          <p className="text-base md:text-2xl">{totalQuantity} items</p>
        </div>
        <div className="grid grid-cols-5 border-b text-center ">
          <p className="col-span-2 text-base md:text-2xl">PRODUCTS DETAILS</p>
          <p className="col-span-1 text-base md:text-2xl">QUANTITY</p>
          <p className="col-span-1 text-base md:text-2xl">PRICE</p>
          <p className="col-span-1 text-base md:text-2xl">TOTAL</p>
        </div>
        <div className="max-h-[23rem] overflow-x-hidden ">
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
              <p className="p-4 text-base md:text-2xl">
                It looks like your cart is empty. Let’s add some items to it!
              </p>
            )}
          </ul>
        </div>
        <div className="m-7 text-[#6467d8]">
          <button
            className="flex items-center justify-center text-base md:text-2xl"
            onClick={continueShopping}
          >
            <BsArrowBarLeft />
            Continue shoppping
          </button>
        </div>
      </div>
      <div className=" col-span-5 flex h-full flex-col bg-[#f6f6f6] md:col-span-2 md:row-span-4">
        <div className="flex justify-between border-b p-4">
          <p className="text-base md:text-2xl">Order Summary</p>
          <p className=" block text-base md:hidden md:text-2xl">Total Amount</p>
        </div>
        <div className="flex w-full justify-between px-4">
          <p className="text-base md:text-2xl">{totalQuantity} Item</p>
          <p className="text-base md:text-2xl">{totalPrice.toFixed(2)}$</p>
        </div>
        <div className=" bg-[#f6f6f6] px-4 md:pt-6">
          <p className="text-xl">SHIPPING</p>
          <p className="text-base">Please input your information</p>
          <form
            onSubmit={sendDataHandler}
            className="flex flex-col bg-[#f6f6f6]"
          >
            <CityDistrictForm />
            <p className="text-base">Address:</p>
            <textarea
              type="text"
              required
              placeholder="Your address"
              className="w-full text-base placeholder:text-base focus:outline-none focus:ring-0 md:hidden md:text-2xl"
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
              className="w-full text-base placeholder:text-base focus:outline-none focus:ring-0 md:hidden md:text-2xl"
              defaultValue={userPhoneNumber}
            ></textarea>
            {hasItems ? (
              <button
                className="mt-4 w-56 self-center py-3 text-xl font-semibold duration-300 dark:bg-blue-300 dark:hover:bg-blue-500 md:w-full"
                type="submit"
              >
                CHECK OUT
              </button>
            ) : (
              <></>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
