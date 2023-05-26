import Categories from "./Categories";
import ListOfProduct from "./ListOfProduct";

function HomePage() {
  const categoryArray = [
    {
      name: `Men's clothing`,
      imgSrc:
        "https://images.unsplash.com/photo-1619208382871-96f4d45bc840?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: `Electronics`,
      imgSrc:
        "https://images.unsplash.com/photo-1494173853739-c21f58b16055?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
    },
    {
      name: `Women's clothing`,
      imgSrc:
        "https://images.unsplash.com/photo-1621786030484-4c855eed6974?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: `Jewelery`,
      imgSrc:
        "https://media.istockphoto.com/id/155013169/vi/anh/trang-s%E1%BB%A9c-tr%C3%AAn-m%C3%A0n-h%C3%ACnh-c%E1%BB%ADa-s%E1%BB%95.jpg?s=1024x1024&w=is&k=20&c=vy7GljKJS3ICH0hARReKQsLS4vi2VkD9YhGuh176vvU=",
    },
  ];
  return (
    <div className="bg-slate-300 rounded-2xl">
      <ul>
        {categoryArray.map((categorie, index) => (
          <li
            key={index}
            className="grid grid-cols-4 gap-4 mt-4 bg-white p-4 rounded-2xl"
          >
            <Categories imgSrc={categorie.imgSrc} name={categorie.name} />
            <ListOfProduct name={categorie.name.toLowerCase()} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
