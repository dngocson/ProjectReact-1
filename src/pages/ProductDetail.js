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
    <div className="p-4 bg-[#64748b] rounded-2xl grid grid-cols-2  gap-5 text-2xl">
      <div className="">
        <div className="bg-white rounded-2xl p-5 h-full">
          <p>Categories: {currentProduct.category}</p>
          <p className="text-4xl py-5 font-bold">{currentProduct.title}</p>
          <div>
            <div className="flex items-start">
              <p className="text-2xl ">{currentProduct.price}$</p>
              <div>
                <div className="flex relative">
                  <div className="absolute flex justify-center items-center top-1">
                    {myArray.map((index, i) => (
                      <AiOutlineStar
                        key={i}
                        style={{ color: "black" }}
                        size={25}
                      />
                    ))}
                  </div>
                  <div className="absolute  flex justify-center items-center top-1">
                    {RatingArray.map((index, i) => (
                      <AiFillStar
                        key={i}
                        style={{ color: "black" }}
                        size={25}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xl pt-5">{currentProduct.description}</p>
          </div>
          <button
            onClick={addtoCartHandler}
            className="self-center mt-4 font-semibold bg-slate-400 hover:bg-indigo-600 duration-300 py-3 text-xl w-full"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center bg-white rounded-2xl  p-4 ">
        <img
          className=" aspect-square rounded-2xl p-4 max-w-full "
          src={currentProduct.image}
        />
      </div>
      <ToastContainer autoClose={1000} limit={3} />
    </div>
  );
};

export default ProductDetail;
