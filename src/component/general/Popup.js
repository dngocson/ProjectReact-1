import Backdrop from "./Backdrop";
import { Fragment } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "./ModalOverlay";
import { uiActions } from "../../store/ui-slice";
import { useDispatch } from "react-redux";
const Popup = () => {
  const dispatch = useDispatch();
  const hideCart = () => {
    dispatch(uiActions.setDisplayCart());
  };

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop hidecart={hideCart} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default Popup;
