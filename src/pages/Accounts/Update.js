import React, { useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { fetchApi } from "../../utils/fetchApi";

import ScoreCards from "../../components/ScoreCards/ScoreCards";
import classes from "./Accounts.module.css";

export const UpdateStats = () => {
  const [disabled, setDisabled] = useState(false);
  const fixtures = useLoaderData();

  const onClickHandler = async () => {
    setDisabled(true);

    const updateData = new Promise((resolve, reject) =>
      fetchApi(
        {
          url: "api/v1/fixture/updateStatistics",
          method: "PATCH",
        },
        true
      )
        .then((result) => resolve(result))
        .catch((err) => {
          return reject(err);
        })
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
  const { fixtures } = useLoaderData();

  const scoreRefs = useRef(
    fixtures.map(() => ({
      homeScore: null,
      awayScore: null,
      matchStatus: null,
    }))
  );

  const onClickHandler = async () => {
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

    const response = await fetchApi(
      {
        url: "api/v1/fixture/updateFixture",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
      true
    );

    if (response.status === "error") {
      toast.error(response.message);
    } else {
      toast.success(response.message);
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
