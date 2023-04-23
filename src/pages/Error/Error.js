import { useRouteError } from "react-router-dom";
import React from "react";

import classes from "./Error.module.css";

const Error = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <React.Fragment>
      <div className={classes["container"]}>
        <h1>Something went wrong</h1>
        {/* <h1>{error.data.split(":")[1]}</h1> */}
      </div>

      <div className={classes["area"]}>
        <ul className={classes["circles"]}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Error;
