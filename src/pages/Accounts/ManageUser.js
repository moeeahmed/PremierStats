import React from "react";

import classes from "./ManageUser.module.css";
import { useLoaderData } from "react-router-dom";

const ManageUser = () => {
  const { users } = useLoaderData();

  return (
    <div className={classes["user-view__form-container"]}>
      <h2 className={`${classes["heading-secondary"]} ${classes["ma-bt-md"]}`}>
        Manage Users
      </h2>
      <p className={`${classes["fixtures--msg"]} ${classes["ma-bt-md"]}`}>
        There are <strong>{users.length}</strong> users that have an account
        with this database. Here you can revoke access, grant admin rights or
        reset passwords for users.
      </p>
      <table className={classes["table"]}>
        <thead>
          <tr>
            <th>
              <p>Name</p>
            </th>
            <th>
              <p>Email</p>
            </th>
            <th>
              <p>Role</p>
            </th>
            <th>
              <p>Active</p>
            </th>
          </tr>
        </thead>

        {users.map((user) => (
          <tbody key={user._id}>
            <tr>
              <td data-label="Name">
                <p>{user.name}</p>
              </td>
              <td data-label="Email">
                <p>{user.email}</p>
              </td>
              <td data-label="Role">
                <p>{user.role}</p>
              </td>
              <td data-label="Active">
                <p>{user.active.toString()}</p>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default ManageUser;
