import React from "react";
import Spinner from "../img/spinner2.gif";

const Loader = () => {
  return (
    <div className="loader-container">
      <img src={Spinner} className="loader" alt="Loading" />
    </div>
  );
};

export default Loader;
