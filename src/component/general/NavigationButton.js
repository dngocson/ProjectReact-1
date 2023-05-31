import { NavLink } from "react-router-dom";
const NavigationButton = ({ desc, label }) => {
  return (
    <li>
      {
        <NavLink
          to={desc}
          className=" text-2xl font-bold text-white aria-[current=page]:text-black"
        >
          {label}
        </NavLink>
      }
    </li>
  );
};

export default NavigationButton;
