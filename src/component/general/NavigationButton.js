import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
const NavigationButton = ({ desc, label }) => {
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(uiActions.setDisplaynav());
  };
  return (
    <li>
      {
        <NavLink
          to={desc}
          className="navLink transition-all duration-200  dark:hover:text-sky-500 dark:aria-[current=page]:text-sky-400"
          onClick={onClickHandler}
        >
          <p className="dark:hover:scale-105">{label}</p>
        </NavLink>
      }
    </li>
  );
};

export default NavigationButton;
