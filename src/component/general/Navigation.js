import NavigationButton from "./NavigationButton";
import { useSelector } from "react-redux";
const items = [
  { label: "HOME", desc: "/" },
  { label: "OUR PRODUCT", desc: "/allProduct" },
  { label: "ORDERED LIST", desc: "/Ordered" },
  { label: "ABOUT", desc: "/about" },
];

function Navigation() {
  const open = useSelector((state) => state.ui.displayNav);
  return (
    <nav className={`${open ? "block" : "hidden"} md:block`}>
      <ul className="flex flex-col items-end md:flex-row md:items-center md:justify-between">
        {items.map((item, index) => (
          <NavigationButton desc={item.desc} label={item.label} key={index} />
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
