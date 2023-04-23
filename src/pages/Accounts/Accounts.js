import React, { useState } from "react";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";

import { store } from "../../store/index";
import AccountsNav from "./AccountsNav";
import classes from "./Accounts.module.css";

export const loader = async () => {
  const { token } = store.getState().auth;

  if (!token) {
    return redirect("/");
  } else {
    const response = await fetch("http://localhost:9000/api/v1/user/getUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log(response);
    } else {
      const resData = await response.json();
      return resData.data;
    }
  }
};

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
