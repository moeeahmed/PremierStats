import React from "react";

import { TableBody } from "./TableBody.js";
import classes from "./Table.module.css";

const Table = (props) => {
  const tableHeadings = [
    "Rank ",
    "Team",
    "Played",
    "Wins",
    "Draws",
    "Losses",
    "Goals F",
    "Goals A",
    "Goal D",
    "Points",
    "Form",
  ];

  return (
    <div className={classes["table"]}>
      <div className="header">
        <h1>Premier League Standings</h1>
      </div>
      <table className={`${classes["table"]} ${classes["fixture__table"]}`}>
        <thead>
          <tr>
            {tableHeadings.map((heading) => (
              <th key={heading}>
                <p>{heading}</p>
              </th>
            ))}
          </tr>
        </thead>
        {props.data.map((team, i) => (
          <TableBody key={team.Team} team={team} index={i} />
        ))}
      </table>
    </div>
  );
};

export default Table;
