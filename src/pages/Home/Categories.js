const Categories = ({ imgSrc, name }) => {
  return (
    <div className="col-span-1 w-full h-full relative ">
      <p className="absolute top-0 text-2xl text-white p-2 m-2 bg-slate-600 bg-opacity-70 rounded-2xl">
        {name}
      </p>
      <img className="w-full h-[40%] rounded-2xl" src={imgSrc}></img>
    </div>
  );
};

export default Categories;
