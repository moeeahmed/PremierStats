import React, { useState, useRef, useEffect } from "react";

import classes from "./Dropdown.module.css";

const Dropdown = ({ teams, handleSelectedCheckboxes }) => {
  const filter = useRef();
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const onClickHandler = () => {
    setIsOpen(!isOpen);
  };
  const onInputChangeHandler = (event) => {
    const checkboxValue = event.target.value;
    const checkboxIndex = selectedCheckboxes.indexOf(checkboxValue);
    if (checkboxIndex > -1) {
      // if the checkbox is already selected, remove it from the list
      setSelectedCheckboxes(
        selectedCheckboxes.filter((value) => value !== checkboxValue)
      );
    } else {
      // if the checkbox is not selected, add it to the list
      setSelectedCheckboxes([...selectedCheckboxes, checkboxValue]);
    }
  };

  useEffect(() => {
    handleSelectedCheckboxes(selectedCheckboxes);
  }, [selectedCheckboxes]);

  return (
    <div className={classes["dropdown-filter"]}>
      <span onClick={onClickHandler} className={classes["filter-icon"]}>
        <i className="fa fa-filter" />
      </span>
      <div
        ref={filter}
        className={`${classes["dropdown-content"]} ${
          isOpen ? classes["show"] : ""
        }`}
      >
        <ul className={classes["filterOptions"]}>
          <li className={classes["filterName"]}>Team</li>
          <div className={classes["filterList"]}>
            {teams.map((team) => (
              <li key={team} className={classes["filterOption"]}>
                <input
                  id="#checkbox1"
                  className={classes["filterName"]}
                  type="checkbox"
                  value={team}
                  onChange={onInputChangeHandler}
                  disabled={
                    selectedCheckboxes.length === 2 &&
                    !selectedCheckboxes.includes(team)
                  }
                />
                <label
                  htmlFor={`checkbox-${team}`}
                  className={classes["toggle"]}
                >
                  {team}
                </label>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
