import { NavLink } from "react-router-dom";
const NavigationButton = ({ desc, label }) => {
  return (
    <li>
      {
        <NavLink
          to={desc}
          className="text-white text-2xl aria-[current=page]:text-black font-bold"
        >
          {label}
        </NavLink>
      }
    </li>
  );
};

export default NavigationButton;
