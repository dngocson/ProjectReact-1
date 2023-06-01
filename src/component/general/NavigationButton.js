import { NavLink } from "react-router-dom";
const NavigationButton = ({ desc, label }) => {
  return (
    <li>
      {
        <NavLink
          to={desc}
          className=" navLink dark:aria-[current=page]:text-sky-400"
        >
          {label}
        </NavLink>
      }
    </li>
  );
};

export default NavigationButton;
