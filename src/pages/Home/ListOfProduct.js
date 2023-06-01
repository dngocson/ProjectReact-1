import Product from "./Product";

import { useSelector } from "react-redux";
const ListOfProduct = ({ name }) => {
  const array = useSelector((state) => state.shop.shopItem);

  const filtredArray = array.filter((item) => item.category === name);
  return (
    <ul className="grid w-full grid-cols-1 gap-1 sm:grid-cols-2 md:w-[80%] md:gap-1 lg:grid-cols-3 lg:gap-2 xl:grid-cols-4 xl:gap-3">
      {filtredArray.map((product, index) => (
        <li className="" key={index}>
          <Product
            key={index}
            title={product.title}
            price={product.price}
            id={product.id}
            image={product.image}
          />
        </li>
      ))}
    </ul>
  );
};

export default ListOfProduct;
