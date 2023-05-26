import { uiActions } from "./ui-slice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export const resumeAuthstate = () => {
  return (dispatch) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(uiActions.checkUserLogin(true));
        dispatch(uiActions.saveUid(user.uid));
      } else {
        dispatch(uiActions.checkUserLogin(false));
        dispatch(uiActions.saveUid(null));
      }
    });
  };
};
