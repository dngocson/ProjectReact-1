import React from "react";

const LandingPage = () => {
  localStorage.setItem("redirectUrl", window.location.href);
  return <div>LandingPage</div>;
};

export default LandingPage;
