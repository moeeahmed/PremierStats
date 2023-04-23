import React from "react";

import classes from "./ScoreCards.module.css";

const ScoreCards = ({ fixture, scoresRef }) => {
  return (
    <React.Fragment>
      <p className={classes["fixture__heading"]}>
        <strong>{fixture.HomeTeam} </strong>vs
        <strong> {fixture.AwayTeam} </strong>at the
        <strong> {fixture.Location}</strong>
      </p>
      <form className={`${classes["fixture--update"]} ${classes["ma-bt-md"]}`}>
        <img
          className={classes["team__badge"]}
          src={require(`../../assets/team logos/${fixture.HomeTeam.toLowerCase()}.png`)}
          data-team="Newcastle"
          alt="Newcastle Team badge"
        />
        <input
          className={classes["form__input"]}
          id="score"
          type="number"
          required=""
          name="score"
          placeholder={fixture.HomeTeamScore}
          ref={(el) => (scoresRef.homeScore = el)}
          data-team={fixture.HomeTeam}
        />
        <div>
          <h1>vs</h1>
        </div>
        <input
          className={classes["form__input"]}
          id="score"
          type="number"
          required=""
          name="score"
          placeholder={fixture.AwayTeamScore}
          ref={(el) => (scoresRef.awayScore = el)}
          data-team={fixture.AwayTeam}
        />
        <img
          className={classes["team__badge"]}
          src={require(`../../assets/team logos/${fixture.AwayTeam.toLowerCase()}.png`)}
          data-team="Brighton"
          alt="Brighton Team badge"
        />
        <select
          className={classes["select__style"]}
          ref={(el) => (scoresRef.matchStatus = el)}
          defaultValue={fixture.Status}
        >
          <option disabled value="Status">
            Status
          </option>
          <option value="Not Started">Not Started </option>
          <option value="Live">Live </option>
          <option value="Finished">Finished </option>
          <option value="Postponed">Postponed</option>
        </select>
      </form>
    </React.Fragment>
  );
};

export default ScoreCards;
