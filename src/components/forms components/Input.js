import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  const { label, type, name, handleChange, errorMessage, isValid, value } =
    props;

  return (
    <div className={classes["inputContainer"]}>
      {errorMessage && !isValid && (
        <span className={classes["error"]}>{errorMessage}</span>
      )}
      <input
        name={name}
        type={type}
        placeholder={label}
        value={value}
        onChange={handleChange}
        className={errorMessage && !isValid ? classes["error"] : ""}
      />
    </div>
  );
};

export default React.memo(Input);
