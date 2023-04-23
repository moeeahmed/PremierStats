import React from "react";
import moment from "moment";

import TeamInfo from "./TeamInfo";
import classes from "./Statistics.module.css";

const Statistics = ({ fixturesBar, data, statistics }) => {
  const [homeStats, awayStats] = statistics;

  const calcPerc = (key) => {
    return homeStats[key] === awayStats[key]
      ? 0.5
      : parseInt(homeStats[key] || 0) /
          (parseInt(homeStats[key] || 0) + parseInt(awayStats[key] || 0));
  };

  return (
    <div className={classes["container"]}>
      <div className={classes["header"]}>
        <i onClick={fixturesBar} className="fa-regular fa-futbol" />
        <h1>{` ${data.HomeTeam} vs ${data.AwayTeam} Match Statistics`}</h1>
      </div>
      <div className={classes["match--overview"]}>
        <TeamInfo team={data.HomeTeam} />
        <div className={classes["column"]}>
          <div className={classes["match-details"]}>
            <div className={classes["match-date"]}>
              <p>
                Game week: <strong>{data.RoundNumber}</strong>
              </p>
              <time>
                {moment(data.Date).format("LL").split(",")[0]} at
                <strong> {moment(data.Date).format("HH:mm")}</strong>
              </time>
            </div>
            <div className={classes["match-score"]}>
              <span className={classes["match-score-number"]}>
                {data.HomeTeamScore}
              </span>
              <span className={classes["match-score-divider"]}>:</span>
              <span className={classes["match-score-number"]}>
                {data.AwayTeamScore}
              </span>
            </div>
            <div className={classes["match-time-lapsed"]}></div>
            <div className={classes["match-referee"]}>
              Referee : <strong>{data.Referee}</strong>
            </div>
          </div>
        </div>
        <TeamInfo team={data.AwayTeam} />
      </div>
      <div className={classes["match--stats"]}>
        {Object.entries(homeStats).map(([key, val]) => (
          <React.Fragment key={key}>
            <p className={classes["stat_header"]}>
              <strong>{key}</strong>
            </p>
            <div className={classes["stat__progress"]}>
              <p>{homeStats[key] || 0}</p>
              <progress
                className={classes["stats"]}
                max="100"
                value={calcPerc(key) * 100}
              />
              <p>{awayStats[key] || 0}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
