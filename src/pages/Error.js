import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h3>
        Something went wrong, go back to homepage <Link to="/">Click me</Link>
      </h3>
    </div>
  );
};

export default ErrorPage;
