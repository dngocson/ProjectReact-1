import { Form, NavLink, useSearchParams } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
const AuthForm = ({ isSummiting, errors }) => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };
  const showConfirmPasswordHandler = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  let text;
  if (isLogin) {
    text = "Login";
  }
  if (!isLogin) {
    text = "Register";
  }
  if (isSummiting) {
    text = "Submitting";
  }
  return (
    <div className="mx-auto rounded-2xl p-1 text-black dark:bg-slate-600 md:p-4">
      <Form
        method="post"
        className="flex flex-col items-center gap-2 p-2 md:gap-4 md:p-9"
      >
        <p className="self-center font-semibold transition duration-300 ease-in-out dark:text-white sm:text-lg md:grid-cols-2 md:text-xl lg:text-2xl xl:text-3xl">
          {isLogin ? "Sign In to Myshop" : "Create a new account"}
        </p>
        <div>
          <div className="group relative w-72 md:w-80 lg:w-96">
            <label
              htmlFor="email"
              className="block w-full pb-1 text-sm font-medium transition-all duration-200 ease-in-out group-focus-within:text-blue-400 md:text-lg"
            >
              Your email
            </label>
            <div className="flex gap-3">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="email"
                required
                className="peer h-10 w-full rounded-md  px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
              />
              <div>
                <AiFillEyeInvisible className=" invisible text-2xl" />
              </div>
            </div>
          </div>
          <p>{errors?.message && <span>{errors.message}</span>}</p>
        </div>
        <div>
          <div className="group relative w-72 md:w-80 lg:w-96">
            <label
              htmlFor="password"
              className="block w-full pb-1 
              text-sm font-medium transition-all duration-200 ease-in-out group-focus-within:text-blue-400 md:text-lg"
            >
              Your password
            </label>
            <div className="flex gap-3">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                required
                className="peer h-10 w-full rounded-md  px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
              />
              <button type="button" onClick={showPasswordHandler}>
                {showPassword ? (
                  <AiFillEyeInvisible className="text-2xl" />
                ) : (
                  <AiFillEye className="text-2xl" />
                )}
              </button>
            </div>
          </div>
          <p>{errors?.password && <span>{errors.password}</span>}</p>
          {!isLogin && (
            <div className="group relative mt-2 w-72 md:w-80 lg:w-96">
              <label
                htmlFor="confirmPassword"
                className="block w-full pb-1 text-sm 
                font-medium transition-all duration-200 ease-in-out group-focus-within:text-blue-400 md:text-lg"
              >
                Password Confirmation
              </label>
              <div className="flex gap-3">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="confirm password"
                  required
                  className="peer h-10 w-full rounded-md  px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
                />
                <button type="button" onClick={showConfirmPasswordHandler}>
                  {showConfirmPassword ? (
                    <AiFillEyeInvisible className="text-2xl" />
                  ) : (
                    <AiFillEye className="text-2xl" />
                  )}
                </button>
              </div>
              <p>{errors?.repassword && <span>{errors.repassword}</span>}</p>
            </div>
          )}
        </div>
        <div className="self-end">
          <button
            disabled={isSummiting}
            className="rounded  px-4 py-2 text-white transition duration-300 hover:-translate-y-1  dark:bg-blue-300 dark:hover:bg-blue-500"
          >
            {text}
          </button>
        </div>
      </Form>
      <div className=" flex w-full items-center justify-center gap-2 rounded-lg p-1 text-sm dark:bg-white">
        {isLogin && (
          <div className="flex items-center justify-center gap-2 rounded-lg dark:bg-white md:text-xl">
            <p>Not a members?</p>
            <NavLink
              className=" font-bold text-blue-500 hover:text-blue-700 "
              to={`?mode=${isLogin ? "signup" : "login"}`}
            >
              Create a new Account
            </NavLink>
          </div>
        )}
        {!isLogin && (
          <div className="flex w-full items-center justify-center gap-2 rounded-lg p-1 dark:bg-white md:text-xl">
            <p>Already have an account?</p>
            <NavLink
              className=" font-bold text-blue-500 hover:text-blue-700"
              to={`?mode=${isLogin ? "signup" : "login"}`}
            >
              Sign in
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
