import React from "react";
import moment from "moment";

import classes from "./Fixtures.module.css";

const Fixtures = ({ data }) => {
  const transformDate = (fixture) => {
    const duration = moment(new Date()).diff(fixture.Date, "minutes");

    return (
      <div
        key={fixture._id}
        className={`${classes["game"]} ${classes["flex-bar"]}`}
      >
        <p className={`${classes["team"]} ${classes["home__team"]}`}>
          {fixture.HomeTeam}
        </p>
        {fixture.Status === "Not Started" ? (
          <p className={classes["score"]}>
            {moment(fixture.Date).format("HH:mm")}
          </p>
        ) : (
          <p className={classes["score"]}>
            {fixture.HomeTeamScore + ":" + fixture.AwayTeamScore}
          </p>
        )}
        <p className={`${classes["team"]} ${classes["away__team"]}`}>
          {fixture.AwayTeam}
        </p>
        {fixture.Status === "Live" && (
          <p className={classes["elapsedGameTime"]}>{duration}</p>
        )}
      </div>
    );
  };

  return (
    <div className={classes["fixtures"]}>
      <div className="header">
        <h1>Today's Fixtures</h1>
      </div>
      {data.length !== 0 && data.map((fixture) => transformDate(fixture))}
      {data.length === 0 && (
        <div className={`${classes["vert-c"]} ${classes["fixtures--msg"]}`}>
          <p>There are no live premier league fixtures today</p>
        </div>
      )}
    </div>
  );
};

export default Fixtures;
