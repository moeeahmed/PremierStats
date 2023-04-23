import React, { useEffect, useState, useRef } from "react";
import { useLoaderData } from "react-router-dom";

import Results from "../../components/Results/Results";
import Statistics from "../../components/Statistics/Statistics";
import classes from "./Fixtures.module.css";
import Dropdown from "../../components/Dropdowns/Dropdown";

const Fixtures = () => {
  const rightSec = useRef(null);
  const { allFixtures, latestFixture, teams } = useLoaderData();
  const [fixture, setFixture] = useState(latestFixture);
  const [restultFixture, setRestultFixture] = useState(allFixtures);
  const [fixtureBarState, setFixtureBarState] = useState(false);

  const onFixtureSelected = async (event) => {
    const getData = async (h, a) => {
      const response = await fetch(
        `http://localhost:9000/api/v1/fixture/getFixtures?HomeTeam=${h}&AwayTeam=${a}`
      );
      if (!response.ok) {
      } else {
        const resData = await response.json();
        return resData;
      }
    };

    const [HomeTeam, AwayTeam] = event.target
      .closest("div")
      .dataset.fixture.split("vs");

    const data = await getData(HomeTeam, AwayTeam);
    setFixture(data.fixture[0]);
    setFixtureBarState(false);
  };

  const handleSelectedCheckboxes = ([HomeTeam, AwayTeam]) => {
    let filteredGames = [];

    if (!HomeTeam && !AwayTeam) {
      setRestultFixture(allFixtures);
      return;
    }

    filteredGames = allFixtures.map((game) => {
      const filteredResults = game.results.filter((result) => {
        return !AwayTeam
          ? result.HomeTeam === HomeTeam || result.AwayTeam === HomeTeam
          : (result.HomeTeam === HomeTeam && result.AwayTeam === AwayTeam) ||
              (result.HomeTeam === AwayTeam && result.AwayTeam === HomeTeam);
      });
      return {
        ...game,
        results: filteredResults,
        numOfGames: filteredResults.length,
      };
    });

    filteredGames = filteredGames.filter((game) => game.results.length > 0);

    setRestultFixture(filteredGames);
  };

  const fixturesBarHandler = () => {
    setFixtureBarState((prevState) => !prevState);
  };

  const onCloseHandler = () => {
    setFixtureBarState(false);
  };

  useEffect(() => {
    rightSec.current.classList.toggle(classes["hide"]);
  }, [fixtureBarState]);

  return (
    <main className={classes["container"]}>
      <div
        ref={rightSec}
        className={`${classes["right-side"]} ${classes["collapsed"]} ${classes["hide"]}`}
      >
        <Results
          fixtureSelected={onFixtureSelected}
          title={"2022/2023 Fixtures"}
          data={restultFixture}
          id={classes["results"]}
          filter={
            <Dropdown
              teams={teams}
              handleSelectedCheckboxes={handleSelectedCheckboxes}
            />
          }
          close={onCloseHandler}
        />
      </div>
      <Statistics
        fixturesBar={fixturesBarHandler}
        data={fixture}
        statistics={fixture.Statistics}
      />
    </main>
  );
};

export default Fixtures;
