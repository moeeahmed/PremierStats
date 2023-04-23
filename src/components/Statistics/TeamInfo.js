import React from "react";

import classes from "./Statistics.module.css";

const TeamInfo = ({ team }) => {
  return (
    <div className={classes["column"]}>
      <div className={`${classes["team"]} ${classes["team--home"]}`}>
        <div className={classes["team-logo"]}>
          <img
            src={require(`../../assets/team logos/${team.toLowerCase()}.png`)}
            alt="home team logo"
          />
        </div>
        <h2 className={classes["team-name"]}>{team}</h2>
      </div>
    </div>
  );
};

export default TeamInfo;
