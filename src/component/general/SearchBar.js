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
    <section className="relative flex flex-col items-center justify-center ">
      <form onSubmit={onSubmitHandler} className="flex items-center ">
        <label htmlFor="searchItem" className="sr-only">
          Search
        </label>
        <div className="max-w-96 relative flex">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <BiSearch />
          </div>
          <input
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            name="searchItem"
            type="text"
            id="searchItem"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            ref={inputRef}
            onBlur={onBlurHandler}
          ></input>
          <button
            className="g-blue-300 ml-2 hidden rounded-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:visible md:block"
            type="submit"
          >
            <BiSearch />
          </button>
        </div>
      </form>
      <div className="absolute top-10 z-10 w-72">
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
          .slice(0, 3)
          .map((item) => (
            <p
              onClick={() => clickTextHandler(item.title)}
              className="left-0 cursor-pointer border border-black dark:bg-slate-700 dark:hover:bg-slate-500 dark:hover:text-green-400"
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
