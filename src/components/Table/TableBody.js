import React from "react";

import classes from "./TableBody.module.css";

export const TableBody = ({ team, index }) => {
  const color = { L: "red", D: "grey", W: "green" };

  const form = team.Form.slice(0, 5).map((n, i) => {
    return (
      <div
        key={`${team.Team} GW${team.Form.length - i}`}
        className={classes["form-indicator"]}
        style={{ backgroundColor: color[n] }}
      >
        {n}
      </div>
    );
  });

  return (
    <tbody>
      <tr>
        <td>
          <p>{index + 1}</p>
        </td>
        <td>
          <p>{team.Team}</p>
        </td>
        <td>
          <p>{team.Played}</p>
        </td>
        <td>
          <p>{team.Wins}</p>
        </td>
        <td>
          <p>{team.Draws}</p>
        </td>
        <td>
          <p>{team.Losses}</p>
        </td>
        <td>
          <p>{team.GF}</p>
        </td>
        <td>
          <p>{team.GA}</p>
        </td>
        <td>
          <p>{team.GD}</p>
        </td>
        <td>
          <p>{team.Points}</p>
        </td>
        <td>
          <div className={classes["team-form"]}>{form}</div>
        </td>
      </tr>
    </tbody>
  );
};
