import React from "react";

import classes from "./Background.module.css";

const Background = (props) => {
  return (
    <React.Fragment>
      <div className={classes["container"]}>{props.children}</div>
      <div className={classes["area"]}>
        <ul className={classes["circles"]}>
          {Array(10)
            .fill(null)
            .map((_, i) => (
              <li key={i} />
            ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Background;
