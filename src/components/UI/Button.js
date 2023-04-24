import React from "react";

import Spinner from "../Loading/Spinner";
import classes from "./Button.module.css";

const Button = ({ text, type, isLoading }) => {
  return (
    <button
      type={type}
      className={`${classes["btn"]} ${isLoading && classes["active"]}`}
    >
      {!isLoading ? text : <Spinner />}
    </button>
  );
};

export default Button;
