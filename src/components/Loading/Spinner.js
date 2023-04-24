import React from "react";

import classes from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={`${classes["spinner"]} ${classes["center"]} `}>
      {Array(12)
        .fill(null)
        .map((_, i) => (
          <div key={i} className={classes["spinner-blade"]} />
        ))}
    </div>
  );
};

export default Spinner;
