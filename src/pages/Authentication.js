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
function Authentication() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSummiting = navigation.state === "submitting";
  const errors = useActionData();
  const signInWithGoogleHandler = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="flex flex-col">
      <p className="text-3xl p-4 text-center">
        Please login or create an account to access all features and save your
        progress.
      </p>
      <AuthForm isSummiting={isSummiting} errors={errors} />
      <button
        className="m-4 bg-white rounded-full w-fit self-center hover:bg-indigo-600"
        onClick={signInWithGoogleHandler}
      >
        <AiOutlineGoogle color="black" size={40} />
      </button>
    </div>
  );
}

export default Authentication;
export async function action({ request }) {
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
  };
  // validate
  if (typeof authData.password !== "string" || authData.password.length < 6) {
    errors.password = "Password must be > 6 characters";
  }
  // return data if we have errors
  if (Object.keys(errors).length) {
    return errors;
  }

  try {
    if (mode === "signup") {
      const response = await createUserWithEmailAndPassword(
        auth,
        authData.email,
        authData.password
      );
    }
    if (mode === "login") {
      const response = await signInWithEmailAndPassword(
        auth,
        authData.email,
        authData.password
      );
    }
    return redirect("/");
  } catch (error) {
    errors.message = error.message;
    return errors;
  }
}
