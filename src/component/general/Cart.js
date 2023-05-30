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
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
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
    navigate("/");
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

  const inputCityHandler = ({ city, district }) => {
    setCity(city);
    dispatch(
      uiActions.setShippingAddress({ phoneNumber, address, city, district })
    );
  };
  const inputDistrictHandler = ({ city, district }) => {
    setDistrict(district);
    dispatch(
      uiActions.setShippingAddress({ phoneNumber, address, city, district })
    );
  };
  return (
    <div className="fixed left-[50%] top-[50%] z-30 grid h-5/6 w-2/3 -translate-x-1/2 -translate-y-1/2 transform grid-cols-7 grid-rows-4 bg-[#ffffff] text-2xl">
      <div className="col-span-5 row-span-3">
        <div className="flex items-center justify-between  border-b p-4">
          <h2>Shopping Cart</h2>
          <h2>{totalQuantity} items</h2>
        </div>
        <div className="grid grid-cols-5 border-b text-center ">
          <p className="col-span-2">PRODUCTS DETAILS</p>
          <p className="col-span-1">QUANTITY</p>
          <p className="col-span-1">PRICE</p>
          <p className="col-span-1">TOTAL</p>
        </div>
        <div className="max-h-[32rem] overflow-x-hidden ">
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
            className="flex items-center justify-center"
            onClick={continueShopping}
          >
            <BsArrowBarLeft />
            Continue shoppping
          </button>
        </div>
      </div>
      <div className="col-span-2 row-span-4 flex h-full flex-col bg-[#f6f6f6]">
        <div className="border-b p-4">
          <h2>Order Summary</h2>
        </div>
        <div className="flex w-full justify-between px-4">
          <h3>{totalQuantity} Item</h3>
          <h3>{totalPrice.toFixed(2)}$</h3>
        </div>
        <div className="px-4 pt-6">
          <p className="text-xl">SHIPPING</p>
          <p className="text-base">Please input your information</p>
          <form onSubmit={sendDataHandler} className="flex flex-col">
            <CityDistrictForm
              setCity={inputCityHandler}
              setDistrict={inputDistrictHandler}
            />
            <p className="text-base">Address:</p>
            <textarea
              type="text"
              required
              placeholder="Your address"
              className="w-full placeholder:text-base focus:outline-none focus:ring-0"
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
              className="w-full text-base"
              defaultValue={userPhoneNumber}
            ></textarea>
            {hasItems ? (
              <button
                className="mt-4 w-full self-center bg-slate-400 py-3 text-xl font-semibold duration-300 hover:bg-indigo-600"
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
