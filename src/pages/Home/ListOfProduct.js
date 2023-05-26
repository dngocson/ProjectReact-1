import Product from "./Product";

import { useSelector } from "react-redux";
const ListOfProduct = ({ name }) => {
  const array = useSelector((state) => state.shop.shopItem);

  const filtredArray = array.filter((item) => item.category === name);
  return (
    <ul className="col-span-3 grid grid-cols-3 gap-3">
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
