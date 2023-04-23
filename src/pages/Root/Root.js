import React from "react";
import { Outlet, useNavigation } from "react-router-dom";

import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";
import Footer from "../../components/Footer/Footer";

const Root = () => {
  const navigation = useNavigation();

  return (
    <React.Fragment>
      <Header />
      {navigation.state === "loading" && <Loading />}
      {navigation.state !== "loading" && <Outlet />}
      <Footer />
    </React.Fragment>
  );
};

export default Root;
