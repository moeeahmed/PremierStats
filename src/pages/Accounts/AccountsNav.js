import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import classes from "./AccountsNav.module.css";

const AccountsNav = ({ user, show }) => {
  const admin = user.user.role;

  return (
    <nav
      className={`${classes["user-view__menu"]} ${!show && classes["hide"]}`}
    >
      <ul className={classes["side-nav"]}>
        <li>
          <Link to="details">Details</Link>
        </li>
        <li>
          <Link to="delete-account">Delete Account</Link>
        </li>
      </ul>
      {admin === "admin" && (
        <div className={classes["admin-nav"]}>
          <h5 className={classes["admin-nav__heading"]}>Admin</h5>
          <ul className={classes["side-nav"]}>
            <li>
              <Link to="update-scores">Update Scores</Link>
            </li>
            <li>
              <Link to="update-statistics">Update Statistics</Link>
            </li>
            <li>
              <Link to="manage-users">Manage Users</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default AccountsNav;
