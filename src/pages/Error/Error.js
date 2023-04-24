import { useRouteError } from "react-router-dom";
import React from "react";

import Background from "../../components/Background/Background";

const Error = () => {
  const error = useRouteError();
  return (
    <Background>
      <h1>Something went wrong</h1>
      {/* <h1>{error.data.split(":")[1]}</h1> */}
    </Background>
  );
};

export default Error;
