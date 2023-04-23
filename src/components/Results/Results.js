import React, { useEffect, useRef } from "react";
import moment from "moment";

import classes from "./Results.module.css";
import { useLocation } from "react-router-dom";

const Results = (props) => {
  const location = useLocation();
  const fixtureRef = useRef();
  const { title, data, fixtureSelected, filter } = props;

  const transformDate = (game) => {
    return (
      <div
        onClick={fixtureSelected}
        className={`${classes["game"]} ${classes["flex-bar"]}`}
        data-fixture={`${game.HomeTeam}vs${game.AwayTeam}`}
        key={`${game.HomeTeam}vs${game.AwayTeam}`}
      >
        <p className={`${classes["team"]} ${classes["home__team"]}`}>
          {game.HomeTeam}
        </p>
        <p className={classes["score"]}>
          {game.HomeTeamScore + ":" + game.AwayTeamScore}
        </p>
        <p className={`${classes["team"]} ${classes["away__team"]}`}>
          {game.AwayTeam}
        </p>
      </div>
    );
  };

  useEffect(() => {
    if (location.pathname === "/") {
      fixtureRef.current.style.height = "auto";
    }
  }, [location]);

  return (
    <div ref={fixtureRef} className={classes["fixtures"]}>
      <div className="header">
        {filter}
        <h1>{title}</h1>
        {props.close && (
          <i
            onClick={props.close}
            className="fa-solid fa-xmark"
            style={{ fontSize: "25px" }}
          />
        )}
      </div>
      <div className={classes["container__fixtures"]}>
        {data.map((result, i) => (
          <React.Fragment key={i}>
            <span key={result._id} className={classes["time"]}>
              {moment(result._id).format("dddd Do MMMM YYYY")}
            </span>
            {result.results.map((game) => transformDate(game))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Results;
