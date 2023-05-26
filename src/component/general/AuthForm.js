import { Form, NavLink, useSearchParams } from "react-router-dom";
const AuthForm = ({ isSummiting, errors }) => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  return (
    <div className="p-4 bg-white max-w-[50%] mx-auto">
      <Form method="post" className="space-y-4">
        <p className="text-2xl">
          Please click{" "}
          <NavLink
            className="text-2xl text-blue-500 hover:text-blue-700"
            to={`?mode=${isLogin ? "signup" : "login"}`}
          >
            HERE
          </NavLink>{" "}
          to change your login mode
        </p>
        <h3 className="text-lg font-semibold">
          {isLogin
            ? "Current mode: Sign In"
            : "Current mode: Register a new user"}
        </h3>
        <p>
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="border rounded px-2 py-1 w-full focus:ring focus:border-blue-300"
          />
          {errors?.message && <span>{errors.message}</span>}
        </p>
        <p>
          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            className="border rounded px-2 py-1 w-full focus:ring focus:border-blue-300"
          />
          {errors?.password && <span>{errors.password}</span>}
        </p>
        <div>
          <button
            disabled={isSummiting}
            className="bg-yellow-300 text-white px-4 py-2 rounded hover:bg-yellow-400"
          >
            {isSummiting ? "Submitting..." : "save"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AuthForm;
