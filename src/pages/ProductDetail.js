import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom/dist";
import "react-toastify/dist/ReactToastify.css";
const ProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.ui.isAuth);
  const id = params.productId;
  const listofProduct = useSelector((state) => state.shop.shopItem);
  const [currentProduct = []] = listofProduct.filter(
    (product) => `${product.id}` === id
  );
  const rating = Math.floor(currentProduct?.rating?.rate) || 5;
  const addtoCartHandler = () => {
    if (!isAuth) {
      navigate("/auth?mode=signup");
      return;
    }
    toast.success("Item added to cart", { theme: "colored" });
    dispatch(
      cartActions.addItemtoCart({
        id: currentProduct.id,
        price: currentProduct.price,
        title: currentProduct.title,
        image: currentProduct.image,
      })
    );
  };
  let size = 5;
  let myArray = Array.from({ length: size }, (v, i) => i);
  let RatingArray = Array.from({ length: rating }, (v, i) => i);
  return (
    <>
      <div className="grid grid-cols-1 gap-5 rounded-2xl p-4 text-sm dark:bg-slate-400 sm:grid-cols-2 sm:text-base md:text-lg lg:text-xl xl:text-2xl">
        <div className="order-2 h-full overflow-hidden rounded-2xl p-5 dark:bg-slate-800 dark:text-white sm:order-1">
          <p className="text-base sm:text-lg md:grid-cols-2 md:text-xl lg:text-2xl xl:text-3xl">
            Categories: {currentProduct.category}
          </p>
          <p className="py-5 text-base font-bold sm:text-lg md:grid-cols-2 md:text-xl lg:text-2xl xl:text-3xl">
            {currentProduct.title}
          </p>
          <div className="flex items-start text-base">
            <p>{currentProduct.price}$</p>
            <div className="relative flex">
              <div className="absolute left-2 top-0 flex items-center justify-center md:top-1">
                {myArray.map((index, i) => (
                  <AiOutlineStar key={i} style={{ color: "white" }} size={25} />
                ))}
              </div>
              <div className="absolute left-2 top-0 flex items-center justify-center md:top-1">
                {RatingArray.map((index, i) => (
                  <AiFillStar key={i} style={{ color: "white" }} size={25} />
                ))}
              </div>
            </div>
          </div>
          <p className="pt-5">{currentProduct.description}</p>
          <div className="flex w-full items-center justify-center md:justify-start">
            <button
              onClick={addtoCartHandler}
              className="mt-4 w-full py-3 font-semibold duration-300 dark:bg-blue-300 dark:hover:bg-blue-500 md:w-72"
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="order-1 flex items-center justify-center rounded-2xl bg-white p-4 sm:order-2">
          <img
            className="aspect-square max-w-full rounded-2xl p-4"
            src={currentProduct.image}
            alt={currentProduct.title}
          />
        </div>
      </div>
      <ToastContainer autoClose={1000} limit={3} />
    </>
  );
};

export default ProductDetail;
