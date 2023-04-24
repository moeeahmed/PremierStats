import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { fetchApi } from "../../utils/fetchApi";

import Button from "../../components/UI/Button";
import classes from "./Accounts.module.css";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const currentPasswordRef = useRef();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const currentPassword = currentPasswordRef.current.value;

    const response = await fetchApi(
      {
        url: "api/v1/user/deleteAccount",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: currentPassword }),
      },
      true
    );

    if (response.status === "error") {
      toast.error(response.message);
    } else {
      toast.success(response.message);
      setTimeout(() => {
        navigate("/logout");
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
        Delete Account
      </h2>
      <p
        style={{ height: "100px" }}
        className={`${classes["fixtures--msg"]} ${classes["ma-bt-md"]}`}
      >
        Please be aware that deleting your account is a permanent action and
        cannot be undone. All of your data, including your account information,
        settings, and activity history, will be permanently deleted from our
        servers.
      </p>
      <form id="password" onSubmit={onSubmitHandler}>
        <div className={classes["form__group"]}>
          <label className={classes["form__label"]}>Confirm Password</label>
          <input
            ref={currentPasswordRef}
            className={classes["form__input"]}
            type="password"
            placeholder="••••••••"
            minLength="8"
            autoComplete="current-password"
          />
        </div>
        <div className={`${classes["right"]} ${classes["form__group"]}`}>
          <Button text={"Delete Account"} />
        </div>
      </form>
    </div>
  );
};

export default DeleteAccount;
