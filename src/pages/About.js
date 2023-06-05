import { Fragment } from "react";
import Map from "../component/general/Map";
function About() {
  return (
    <Fragment>
      <h2>About us</h2>
      <p className="my-1 text-sm md:text-xl">
        Thank you for choosing our store for your shopping needs!
      </p>
      <Map />
    </Fragment>
  );
}
export default About;
