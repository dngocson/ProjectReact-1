import { Form, NavLink, useSearchParams } from "react-router-dom";
const AuthForm = ({ isSummiting, errors }) => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
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
    <div className="mx-auto  bg-white p-4 ">
      <Form method="post" className=" flex flex-col items-center space-y-4">
        <h3 className="self-center text-lg font-semibold">
          {isLogin ? "Sign In to Myshop" : "Create a new account"}
        </h3>
        <div>
          <label htmlFor="email" className="mb-1 block font-medium">
            your email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="email"
            required
            className="w-full rounded border px-2 py-1 focus:border-blue-300 focus:ring"
          />
          <p>{errors?.message && <span>{errors.message}</span>}</p>
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block font-medium">
            your password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="password"
            required
            className="w-full rounded border px-2 py-1 focus:border-blue-300 focus:ring"
          />
          <p>{errors?.password && <span>{errors.password}</span>}</p>
          {!isLogin && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1 block font-medium"
              >
                Password Confirmation
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="confirm password"
                required
                className="w-full rounded border px-2 py-1 focus:border-blue-300 focus:ring"
              />
              <p>{errors?.repassword && <span>{errors.repassword}</span>}</p>
            </div>
          )}
        </div>
        <div className="self-end">
          <button
            disabled={isSummiting}
            className="rounded  bg-yellow-300 px-4 py-2 text-white hover:bg-yellow-400"
          >
            {text}
          </button>
        </div>
      </Form>
      <div className="m-2 bg-yellow-500 p-2">
        {isLogin && (
          <p className="text-2xl">
            Not a members?
            <NavLink
              className="text-2xl text-blue-500 hover:text-blue-700"
              to={`?mode=${isLogin ? "signup" : "login"}`}
            >
              Create a new Account
            </NavLink>{" "}
          </p>
        )}
        {!isLogin && (
          <p className="text-2xl">
            Already has an account?
            <NavLink
              className="text-2xl text-blue-500 hover:text-blue-700"
              to={`?mode=${isLogin ? "signup" : "login"}`}
            >
              Sign in
            </NavLink>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
