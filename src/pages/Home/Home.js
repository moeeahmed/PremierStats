import React from "react";
import { useLoaderData } from "react-router-dom";

import Table from "../../components/Table/Table";
import Fixtures from "../../components/Fixtures/Fixtures";
import Results from "../../components/Results/Results";
import classes from "./Home.module.css";

export const loader = async () => {
  const response = await fetch("http://localhost:9000/api/v1/fixture/home");
  if (!response.ok) {
    throw new Response();
  } else {
    const resData = await response.json();
    return resData;
  }
};

const Home = () => {
  const { standings, fixtures, results } = useLoaderData();

  return (
    <main className={classes["container"]}>
      <Table data={standings} className={classes["table"]} />
      <div className={classes["left-side"]}>
        <Fixtures data={fixtures} id={classes["fixtures"]} />
        <Results
          title={"Last 10 Results"}
          data={results}
          id={classes["results"]}
        />
      </div>
    </main>
  );
};

export default Home;
