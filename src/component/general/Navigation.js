import NavigationButton from "./NavigationButton";
const items = [
  { label: "HOME", desc: "/" },
  // { label: "OUR PRODUCT", desc: "/allProduct" },
  { label: "ORDERED LIST", desc: "/Ordered" },
  { label: "ABOUT", desc: "/about" },
];
function Navigation() {
  return (
    <nav className="px-10">
      <ul className="flex justify-between">
        {items.map((item, index) => (
          <NavigationButton desc={item.desc} label={item.label} key={index} />
        ))}
      </ul>
    </nav>
  );
}
export default Navigation;
