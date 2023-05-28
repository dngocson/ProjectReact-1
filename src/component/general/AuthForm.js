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
    <div className="p-4 bg-white  mx-auto">
      <Form method="post" className="space-y-4 flex items-center flex-col">
        <h3 className="text-lg font-semibold self-center">
          {isLogin ? "Sign In to Myshop" : "Create a new account"}
        </h3>
        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            your email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="email"
            required
            className="border rounded px-2 py-1 w-full focus:ring focus:border-blue-300"
          />
          <p>{errors?.message && <span>{errors.message}</span>}</p>
        </div>
        <div>
          <label htmlFor="password" className="block font-medium mb-1">
            your password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="password"
            required
            className="border rounded px-2 py-1 w-full focus:ring focus:border-blue-300"
          />
          <p>{errors?.password && <span>{errors.password}</span>}</p>
          {!isLogin && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block font-medium mb-1"
              >
                Password Confirmation
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="confirm password"
                required
                className="border rounded px-2 py-1 w-full focus:ring focus:border-blue-300"
              />
              <p>{errors?.repassword && <span>{errors.repassword}</span>}</p>
            </div>
          )}
        </div>
        <div className="self-end">
          <button
            disabled={isSummiting}
            className="bg-yellow-300  text-white px-4 py-2 rounded hover:bg-yellow-400"
          >
            {text}
          </button>
        </div>
      </Form>
      <div className="bg-yellow-500 p-2 m-2">
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
