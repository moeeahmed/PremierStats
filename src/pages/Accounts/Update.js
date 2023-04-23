import React, { useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import ScoreCards from "../../components/ScoreCards/ScoreCards";
import classes from "./Accounts.module.css";
import { store } from "../../store/index";

export const loader = async (url) => {
  const { token } = store.getState().auth;
  const response = await fetch(`http://localhost:9000/api/v1/fixture/${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
  } else {
    const resData = await response.json();
    return resData;
  }
};

export const UpdateStats = () => {
  const [disabled, setDisabled] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const fixtures = useLoaderData();

  const onClickHandler = () => {
    setDisabled(true);

    const updateData = new Promise((resolve, reject) =>
      fetch("http://localhost:9000/api/v1/fixture/updateStatistics", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((result) => resolve(result))
        .catch((err) => reject(err))
    );

    toast.promise(updateData, {
      loading: "Updating Match Statistics",
      success: (data) => data.result,
      error: "Something when wrong",
    });
  };

  return (
    <div className={classes["user-view__form-container"]}>
      <Toaster
        containerStyle={{
          boxSizing: "borderBox",
        }}
        toastOptions={{
          position: "top-center",
          style: {
            background: "#444",
            color: "#fff",
            fontSize: "16px",
          },
        }}
      />
      <h2 className={`${classes["heading-secondary"]} ${classes["ma-bt-md"]}`}>
        Update Score
      </h2>
      <p className={`${classes["fixtures--msg"]} ${classes["ma-bt-md"]}`}>
        There {fixtures.length === 1 ? "is " : "are "}
        <strong>{fixtures.length}</strong> fixture
        {fixtures.length === 1 ? " " : "s "} that need stats updating
      </p>
      <div className={classes["fixtures-container"]}>
        {fixtures.map((fixture) => (
          <p key={fixture.MatchNumber} className={classes["fixture__heading"]}>
            {fixture.MatchNumber} - <strong>{fixture.HomeTeam}</strong> vs{" "}
            <strong> {fixture.AwayTeam}</strong> at the {fixture.Location}
          </p>
        ))}
      </div>

      <div className={`${classes["form__group"]} ${classes["right"]}`}>
        <button
          onClick={onClickHandler}
          className={classes["btn"]}
          disabled={disabled}
        >
          Update Stats
        </button>
      </div>
    </div>
  );
};

export const UpdateScores = () => {
  const token = useSelector((state) => state.auth.token);

  const { fixtures } = useLoaderData();

  const scoreRefs = useRef(
    fixtures.map(() => ({
      homeScore: null,
      awayScore: null,
      matchStatus: null,
    }))
  );

  const onClickHandler = async () => {
    console.log(scoreRefs.current);
    const data = scoreRefs.current
      .map((element) => {
        if (element.matchStatus.value) {
          return {
            HomeTeam: element.homeScore.dataset.team,
            AwayTeam: element.awayScore.dataset.team,
            HomeTeamScore:
              element.homeScore.value || element.homeScore.placeholder,
            AwayTeamScore:
              element.awayScore.value || element.homeScore.placeholder,
            Status: element.matchStatus.value || "Not Started",
          };
        }
        return null;
      })
      .filter(Boolean);

    console.log(fixtures);
    console.log(data);

    const resp = await fetch(
      "http://localhost:9000/api/v1/fixture/updateFixture",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    const res = await resp.json();

    if (resp.ok) {
      toast.success(res.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <div className={classes["user-view__form-container"]}>
      <Toaster
        containerStyle={{
          boxSizing: "borderBox",
        }}
        toastOptions={{
          position: "top-center",
          style: {
            background: "#444",
            color: "#fff",
            fontSize: "16px",
          },
        }}
      />
      <h2 className={`${classes["heading-secondary"]} ${classes["ma-bt-md"]}`}>
        Update Score
      </h2>
      <p className={`${classes["fixtures--msg"]} ${classes["ma-bt-md"]}`}>
        There {fixtures.length === 1 ? "is " : "are "}
        <strong>{fixtures.length}</strong> fixture
        {fixtures.length === 1 ? " " : "s "} that needs updating
      </p>
      <div className={classes["fixtures-container"]}>
        {fixtures.map((fixture, index) => (
          <ScoreCards
            key={fixture.MatchNumber}
            fixture={fixture}
            scoresRef={scoreRefs.current[index]}
          />
        ))}
      </div>

      <div className={`${classes["form__group"]} ${classes["right"]}`}>
        <button onClick={onClickHandler} className={classes["btn"]}>
          Save updates
        </button>
      </div>
    </div>
  );
};
