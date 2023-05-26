import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
function SearchBar() {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [value, setValue] = useState("");
  const targetArray = useSelector((state) => state.shop);
  const { shopItem } = targetArray;
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const [item] = shopItem.filter((item) => item.title === value);
    if (!item) return;
    setValue("");

    navigate(`/product/detail/${item.id}`);
  };
  const clickTextHandler = (title) => {
    setValue(title);
    const [item] = shopItem.filter((item) => item.title === title);
    console.log(title);
    if (!item) return;
    navigate(`/product/detail/${item.id}`);
    setValue("");
  };
  const onBlurHandler = () => {
    setTimeout(() => {
      setValue("");
    }, 300);
  };
  return (
    <section className="flex items-center flex-col justify-center relative ">
      <form onSubmit={onSubmitHandler} className="flex items-center ">
        <label className="sr-only">Search</label>
        <div className="relative  max-w-96 flex">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <BiSearch />
          </div>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            ref={inputRef}
            onBlur={onBlurHandler}
          ></input>
          <button
            className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 g-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="submit"
          >
            <BiSearch />
          </button>
        </div>
      </form>
      <div className="absolute top-10 z-10">
        {shopItem
          .filter((item) => {
            const searchTerm = value.toLowerCase();
            const fullName = item.title.toLowerCase();
            return (
              searchTerm &&
              fullName.startsWith(searchTerm) &&
              fullName !== searchTerm
            );
          })
          .slice(0, 10)
          .map((item) => (
            <p
              onClick={() => clickTextHandler(item.title)}
              className="cursor-pointer bg-white left-0 border border-black"
              key={item.title}
            >
              {item.title}
            </p>
          ))}
      </div>
    </section>
  );
}
export default SearchBar;
