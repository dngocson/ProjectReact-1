import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
const CartItem = (props) => {
  const dispatch = useDispatch();

  const { title, quantity, total, price, id, image } = props.item;
  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart({ id, price }));
  };
  const addItemHandler = () => {
    dispatch(
      cartActions.addItemtoCart({
        id,
        price,
      })
    );
  };
  const removeHandler = () => {
    dispatch(cartActions.removeAllQuantityFromCart({ id, quantity, total }));
  };
  return (
    <li className="grid grid-cols-5 border-b p-2 text-sm sm:text-base md:text-xl ">
      <div className="col-span-2 flex items-center gap-3">
        <img src={image} className="aspect-square w-[25%]" />
        <div>
          <p>{title}</p>
          <button onClick={removeHandler} className=" text-red-600">
            remove
          </button>
        </div>
      </div>
      <div className="col-span-1 flex items-center justify-center gap-3">
        <button onClick={removeItemHandler}>-</button>
        <p>{quantity}</p>
        <button onClick={addItemHandler}>+</button>
      </div>
      <div className="col-span-1 flex items-center justify-center ">
        <p>${price}</p>
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <p>${total.toFixed(2)}</p>
      </div>
    </li>
  );
};

export default CartItem;
