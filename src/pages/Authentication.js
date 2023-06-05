import AuthForm from "../component/general/AuthForm";
import { json, redirect } from "react-router-dom";
import { firebaseAuth as auth, googleProvider } from "../config/firebase";
import { AiOutlineGoogle } from "react-icons/ai";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate, useNavigation, useActionData } from "react-router-dom";
import { useSelector } from "react-redux";
////////////////////
function getPathnameFromUrl(url) {
  let a = document.createElement("a");
  a.href = url;
  return a.pathname;
}

/////////////////////
function Authentication() {
  const isDark = useSelector((state) => state.ui.isDark);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSummiting = navigation.state === "submitting";
  const errors = useActionData();
  const redirectUrl = localStorage.getItem("redirectUrl") || "/";
  let pathname = getPathnameFromUrl(redirectUrl);
  const signInWithGoogleHandler = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate(pathname);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="flex flex-col">
      <p className="p-4 text-center sm:text-lg md:grid-cols-2 md:text-xl lg:text-2xl xl:text-3xl">
        Please sign in or create an account to access all features and save your
        progress.
      </p>
      <AuthForm isSummiting={isSummiting} errors={errors} />
      <div className="mt-4 flex flex-col items-center justify-end gap-2 self-center">
        <p className="text-base uppercase text-pink-600 dark:text-green-400 md:text-2xl">
          have a google account?
        </p>
        <button
          className="m-1 w-fit self-center rounded-full bg-black hover:bg-blue-600 dark:bg-white dark:hover:bg-green-600"
          onClick={signInWithGoogleHandler}
        >
          <AiOutlineGoogle color={isDark ? "white" : "black"} size={40} />
        </button>
      </div>
    </div>
  );
}

export default Authentication;
export async function action({ request }) {
  const redirectUrl = localStorage.getItem("redirectUrl") || "/";
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode" }, { status: 500 });
  }
  const errors = {};
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
    confirmPassword: data.get("confirmPassword"),
  };
  // validate
  if (typeof authData.password !== "string" || authData.password.length < 6) {
    errors.password = "Password must be > 6 characters";
  }

  if (mode === "signup" && authData.password !== authData.confirmPassword) {
    errors.repassword = "confirm password missmatch!";
  }
  if (Object.keys(errors).length) {
    // return data if we have errors
    return errors;
  }

  try {
    if (mode === "signup") {
      await createUserWithEmailAndPassword(
        auth,
        authData.email,
        authData.password
      );
    }
    if (mode === "login") {
      await signInWithEmailAndPassword(auth, authData.email, authData.password);
    }
    return redirect(redirectUrl);
  } catch (error) {
    errors.message = error.message;
    return errors;
  }
}
