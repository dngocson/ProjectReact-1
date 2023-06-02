const Categories = ({ imgSrc, name }) => {
  return (
    <div className="w-[100%] rounded-2xl border border-gray-200  shadow dark:border-gray-700 dark:bg-gray-800 md:w-[30%] lg:w-[20%]">
      <div className="relative p-4 ">
        <p className="absolute top-5 m-2  rounded-2xl bg-slate-600 bg-opacity-70 p-2 text-xs text-white md:text-sm lg:text-xl">
          {name}
        </p>
        <img className=" h-96 w-full rounded-2xl" src={imgSrc}></img>
      </div>
    </div>
  );
};

export default Categories;
