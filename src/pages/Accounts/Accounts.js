import React, { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

import AccountsNav from "./AccountsNav";
import classes from "./Accounts.module.css";

const Accounts = () => {
  const user = useLoaderData();

  const [sidebarState, setSidebarState] = useState(false);

  const onSidebarHandler = () => {
    setSidebarState((prevState) => !prevState);
  };

  return (
    <main className={classes["main"]}>
      <div className={classes["user-view"]}>
        <AccountsNav
          user={user}
          show={sidebarState}
          sidebarHandler={onSidebarHandler}
        />
        <div className={classes["user-view__content"]}>
          <div onClick={onSidebarHandler} className={classes["nav-arrow"]}>
            {!sidebarState ? (
              <i className="fa-solid fa-arrow-right" />
            ) : (
              <i
                className="fa-solid fa-arrow-left"
                style={{ color: "white" }}
              />
            )}
          </div>
          <Outlet context={user} />
        </div>
      </div>
    </main>
  );
};

export default Accounts;
